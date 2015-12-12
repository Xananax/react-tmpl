import React,{Component,Children} from 'react';
import cx from 'classnames';

import {assign,mapObj} from 'jobj';
import mergeProps from './mergeProps';
import computeProps from './computeProps';

export const statics = {
	cx:cx
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
,	compute(computedProps){
		return computeProps(this,computedProps);
	}
,	buildStyle(givenProps,includeCSS){
		const defCSS = includeCSS && this.constructor.css;
		const defStyle = this.constructor.style;
		const givenStyle = givenProps && givenProps.style;

		if(!defCSS && !defStyle && !givenStyle){return}

		return assign(defCSS,defStyle,givenStyle);
	}
,	buildClassName(givenProps){
		const def = this.constructor.className;
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
,	buildLocals(props){
		return props;
	}
,	getLocals(givenProps,includeCSS){
		const className = this.buildClassName(givenProps);
		const style = this.buildStyle(givenProps,includeCSS);
		const defaultProps = this.constructor.props;
		const props = this.buildLocals(
			assign(
				defaultProps.self
			,	defaultProps.children
			,	givenProps
			,	className && {className}
			,	style && {style}
			)
		)
		const locals = this.compute(
			props
		,	givenProps
		)
		if(locals.className){
			locals.className = Array.isArray (locals.className) ? cx(...locals.className) : cx(locals.className)
		}
		return locals;
	}
,	getTemplate(name){
		const templates = this.getTemplates();
		if(name in templates){return templates[name];}
		throw new Error(`could not find the \`${name}\`template`);
	}
,	fillTemplate(name,givenProps){
		const template = this.getTemplate(name);
		const defaultProps = template.props.self;
		const props = mergeProps(defaultProps,givenProps);
		return React.createElement(template,props);
	}
,	autoTemplate(name,givenProps){
		if(!givenProps && !this.locals[name]){return null;}
		const props = givenProps ? assign(this.locals[name],givenProps) : this.locals[name];
		if(this.props.includeCSS){props.includeCSS = true;}
		return this.fillTemplate(name,props);
	}
,	render(){
		const template = this.constructor.template;
		this.locals = this.getLocals(this.props,this.props.includeCSS);
		return template.call(this,this.locals);
	}
}
