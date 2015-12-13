import React,{PropTypes,Component} from 'react'
import {arrayToObj,assign} from 'jobj';
import {statics,methods} from './Template';

const skip = /^(propTypes|name|className|style|css|state)$/
const staticsKeys = Object.keys(statics);
const methodsKeys = Object.keys(methods);

export default function buildTemplate(render,conf,templates,...mixins){

	const name = (conf && conf.name) || render.name;
	const state = assign((conf && conf.state) || {});
	if(!name){throw new Error('`name` is a required property');}

	function Template(props,context){
		if(!(this instanceof Template)){return new Template(props,context);}
		Component.call(this,props,context);
		this.state = state;
		this.initialize(props);
	}

	staticsKeys.forEach(function(key){
		Template[key] = statics[key]
	})

	Template.displayName = name;
	Template.props = {self:{},children:{}};
	Template.template = render;

	const prototype = new Component();
	methodsKeys.forEach(function(key){
		prototype[key] = methods[key];
	})

	Template.prototype = prototype;
	Template.prototype.constructor = Template;

	Template.prototype.getTemplates = function getTemplates(){return templates}

	const propTypes = (conf && conf.propTypes && (
		Array.isArray(conf.propTypes) ?
			arrayToObj(conf.propTypes,function(prop){return [prop,PropTypes.any.isRequired]}):
			conf.propTypes
	));

	if(propTypes){
		Template.propTypes = propTypes;
	}
	if(conf && conf.style){
		Template.style = conf.style;
	}
	if(conf && conf.css){
		Template.css = conf.css;
	}
	if(conf && conf.className){
		Template.className = conf.className
	}

	function addBindable(key){
		Template.bindables = Template.bindables ? [...Template.bindables,key] : [key];
	}

	Template.addBindable = addBindable;

	conf && Object.keys(conf).forEach(function(key){
		const val = conf[key];
		if(skip.test(key)){return;}
		if(typeof val === 'function'){
			Template.prototype[key] = val;
			if(/^on/.test(key)){
				addBindable(key)
			}
			return;
		}
		if(/^[A-Z]/.test(key)){
			Template.prototype[key] = function(locals,arrKey){
				return this.autoTemplate(key,locals,arrKey);
			}
			addBindable(key)
			Template.props.children[key] = val;
			return;
		}
		Template.props.self[key] = val;
	})

	if(Template.style){
		if(Template.style.hover){
			const hover = Template.style.hover;
			delete Template.style.hover;
			Template._hoverStyle = hover;
			createEventHandler('onMouseEnter',{hover:true},Template)
			createEventHandler('onMouseLeave',{hover:false},Template)
		}
		if(Template.style.focus){
			if(!Template.props.self.tabIndex){
				Template.props.self.tabIndex = 1;
			}
			const focus = Template.style.focus;
			delete Template.style.focus;
			Template._focusStyle = focus;
			createEventHandler('onFocus',{focus:true},Template)
			createEventHandler('onBlur',{focus:false},Template)
		}
	}

	templates[name] = Template;
	if(mixins){
		mixins.forEach(mixin=>{
			Template = mixin(Template)
		});
	}
	return Template;
}


function createEventHandler(name,state,Template){
	if(name in Template.prototype){
		const _original = Template.prototype[name];
		Template.prototype[name] = function(evt){
			this.setState(state)
			_original.call(this,evt);
		}
		return;
	}
	Template.prototype[name] = function(evt){
		this.setState(state);
	}
	Template.addBindable(name);
}
