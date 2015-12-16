import React,{Component,Children} from 'react';
import cx from 'classnames';

import {assign,mapObj,objFilter} from 'jobj';
import mergeProps from './mergeProps';
import computeProps from './computeProps';

export const statics = {
	cx:cx
,	templates:{}
,	bind(obj){
		const bindables = this.bindables;
		if(bindables && bindables.length){
			bindables.forEach(key=>{
				obj[key] = obj[key].bind(obj);
			})
		}
	}
,	includeCSS(doInclude){
		_includeCSS = !!doInclude;
	}
,	template(locals){
		return (<div>
			<h1>Default Template</h1>
			<ul>
				{mapObj(locals,function(val,key){
					return (<li key={key}>{key}:{JSON.stringify(val)}</li>)
				})}
			</ul>
		</div>)
	}
}

export const methods = {
	initialize(props){
		this.constructor.bind(this);
	}
,	replaceMethod(name,method){
		const _old = this[name];
		if(_old){		
			this[name] = function(...args){
				_old.apply(this,args);
				return method.apply(this,args)
			}
		}else{
			this[name] = method;
		}
	}
,	compute(computedProps){
		return computeProps(this,computedProps);
	}
,	buildStyle(givenProps,includeCSS){
		const Template = this.constructor
		const defCSS = includeCSS && this.constructor.css;
		const defStyle = Template.style;
		const givenStyle = givenProps && givenProps.style;

		if(!defCSS && !defStyle && !givenStyle){return}

		const style = assign(defCSS,defStyle,givenStyle);

		const additional = [];

		if(Template._hoverStyle && this.state.hover){
			additional.push(Template._hoverStyle);
		}
		if(Template._focusStyle && this.state.focus){
			additional.push(Template._focusStyle);
		}
		if(additional.length){
			return Object.assign(style,...additional);
		}
		return style;

	}
,	buildClassName(givenProps){
		const Template = this.constructor;
		const def = Template.className;
		const given = givenProps.className;
		if(def && def.length && given && given.length){
			const isArrayDef = Array.isArray(def);
			const isArrayGiven = Array.isArray(given);
			if(isArrayDef && isArrayGiven){
				return [...def,...given]
			}
			if(isArrayDef){
				return [...def,given];
			}
			if(isArrayGiven){
				return [def,...given];
			}
		}
		if(given && given.length){return given;}
		if(def && def.length){return def;}
	}
,	buildEventsHandlers(givenProps){
		const bindables = this.constructor.bindables;
		if(!bindables || !bindables.length){return;}
		const that = this;
		const eventsHandlers = {};
		bindables.forEach(function(name){
			eventsHandlers[name] = that[name];
		});
		return eventsHandlers;
	}
,	processProps(mergedProps){
		return mergedProps;
	}
,	buildLocals(generatedLocals){
		return generatedLocals;
	}
,	computeClasses(locals){
		if(locals.props.className){
			locals.props.className = Array.isArray(locals.props.className) ? 
				cx(...locals.props.className) : 
				cx(locals.props.className)
		}
		return locals;
	}
,	mergeProps(givenProps,eventsHandlers,className,style){
		const defaultProps = this.constructor.props;
		return assign(
			{
				props:assign(
					defaultProps.self
				,	givenProps
				,	eventsHandlers
				,	className && {className}
				,	style && {style}
				)
			}
		,	defaultProps.children
		)
	}
,	getLocals(givenProps,includeCSS){
		const className = this.buildClassName(givenProps);
		const style = this.buildStyle(givenProps,includeCSS);
		const eventsHandlers = this.buildEventsHandlers(givenProps)
		const mergedProps = this.mergeProps(givenProps,eventsHandlers,className,style);
		const props = this.processProps(mergedProps)
		const locals = this.buildLocals(
			this.computeClasses(
				this.compute(props,givenProps)
			)
		);
		return locals;
	}
,	getTemplate(name){
		const templates = this.constructor.templates;
		if(name in templates){return templates[name];}
		const defTemplates = this.getTemplates();
		if(name in defTemplates){return defTemplates[name];}
		throw new Error(`could not find the \`${name}\`template`);
	}
,	fillTemplate(name,givenProps,key){
		const template = this.getTemplate(name);
		const defaultProps = template.props.self;
		const props = mergeProps(defaultProps,givenProps);
		if(typeof key!=='undefined'){
			return React.createElement(template,{...props,key});
		}
		return React.createElement(template,props);
	}
,	autoTemplate(name,givenProps,key){
		if(!givenProps && !this.locals[name]){return null;}
		const props = givenProps ? assign(this.locals[name],givenProps) : this.locals[name];
		if(this.props.includeCSS){props.includeCSS = true;}
		return this.fillTemplate(name,props,key);
	}
,	render(){
		const template = this.constructor.template;
		this.locals = this.getLocals(this.props,this.props.includeCSS);
		return template.call(this,this.locals.props);
	}
}
