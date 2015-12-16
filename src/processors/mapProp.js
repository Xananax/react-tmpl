import React from 'react';
import isArray from '../utils/isArray';
import isString from '../utils/isString';

function noOp(){};

export default function prepareMapProp(name,Component,skipNonArray,keyProp){

	return function mapProp(props){
		
		if(!props || !(name in props)){
			return Object.assign({[name]:noOp},props);
		}

		const items = isArray(props[name]) ? props[name] : 
			skipNonArray ? null :
			[props[name]];

		if(!items){
			return props;
		}
		
		function mapped(newProps){
			return items.map(function mapProp(itemProps,index){
				var children;
				if(isString(itemProps)){
					children = itemProps;
					itemProps = {};
				}
				if(!itemProps.key){
					const key = (keyProp && item[keyProp]) || index;
					itemProps = Object.assign({},itemProps,{key})
				}
				if(newProps){itemProps = Object.assign({},itemProps,newProps)}
				return React.createElement(Component,itemProps,children)
			})
		}
		
		mapped.items = items;

		return Object.assign({},props,{[name]:mapped})
	}

}