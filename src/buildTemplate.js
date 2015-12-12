import React,{PropTypes,Component} from 'react'
import {arrayToObj} from 'jobj';
import {statics,methods} from './Template';

const skip = /^(propTypes|name|className|style|css|state)$/
const staticsKeys = Object.keys(statics);
const methodsKeys = Object.keys(methods);

export default function buildTemplate(render,conf,templates){

	const name = (conf && conf.name) || render.name;
	const state = (conf && conf.state) || null;
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

	conf && Object.keys(conf).forEach(function(key){
		const val = conf[key];
		if(skip.test(key)){return;}
		if(typeof val === 'function'){
			Template.prototype[key] = val;
			if(/^on/.test(key)){
				Template.bindables = Template.bindables ? [...Template.bindables,key] : [key];
			}
			return;
		}
		if(/^[A-Z]/.test(key)){
			Template.prototype[key] = function(locals){
				return this.autoTemplate(key,locals);
			}
			Template.props.children[key] = val;
			return;
		}
		Template.props.self[key] = val;
	})

	templates[name] = Template;
	return Template;
}
