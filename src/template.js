import React from 'react';

import {
	compose
,	windowResize
,	ownSize
,	addAttributes
,	mergeAttributes
,	cssToStyle
,	pluckAttributes
,	computeProps
,	mergeEvents
,	wrapChildren
,	embedComponentsAttributes
,	prop
,	mapProp
,	append
} from './index';

const skip = ['addAttributes','wrapChildren','mapProps','templates','use','events'];

export default function template(renderFn,conf,css){

	conf = conf || {};

	const name = conf.name || renderFn.name;
	const _addAttributes = conf.addAttributes;
	const _wrapChildren = conf.wrapChildren;
	const _mapProps = (conf.mapProps && Object.keys(conf.mapProps).map(function(key){return mapProp(key,conf.mapProps[key])})) || []
	const _embedComponentsAttributes = conf.templates;
	const _use = conf.use;
	const _events = conf.events;

	const props = {};
	var hasProps = false;
	Object.keys(conf).forEach(function(key){
		if(skip.indexOf(key)>=0){return;}
		hasProps = true;
		props[key] = conf[key];
	})

	class Template extends React.Component{
		static displayName = name
		constructor(props,context){
			super(props,context);
		}
		locals = compose(
			'buildLocals'
		,	_addAttributes && addAttributes(_addAttributes)
		,	_events && mergeEvents(_events)
		,	hasProps && mergeAttributes(Template.props)
		,	hasProps && cssToStyle(css)
		,	hasProps && computeProps()
		,	pluckAttributes()
		,	_wrapChildren
		,	..._mapProps
		,	_embedComponentsAttributes &&  embedComponentsAttributes(_embedComponentsAttributes)
		,	fix()
		)
		template(props,state){
			const locals = this.locals(props);
			return renderFn(locals,state);
		}
		render(){
			return this.template(this.props,this.state);
		}
	}

	Template.props = props;

	if(_use){
		return compose(name,...append(_use,Template))
	}
	return Template;
}