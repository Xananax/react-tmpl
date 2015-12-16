import React from 'react';
import mergeAttributes from './mergeAttributes';

export default function prepareEmbedComponentsAttributes(map){

	return function embedComponentsAttributes(props){
		if(!props){return props;}
		const retProps = {};
		Object.keys(props).forEach(function(key){
			const val = props[key]
			if(/^[A-Z]/.test(key) && map[key]){
				const merge = mergeAttributes(val)
				const Component = map[key];
				retProps[key] = function renderEmbedded(additionalProps){
					const props = merge(additionalProps)
					return React.createElement(Component,props);
				}
			}else{
				retProps[key] = val;
			}
		})
		return retProps;
	}
}