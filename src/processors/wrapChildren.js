import React,{Children} from 'react'


function noOp(){}

export default function prepareWrapChildren(Component,keyProp){

	return function mapChildren(props){
		
		if(!props || !('children' in props)){
			return Object.assign({children:noOp},props);
		}

		const children = Children.toArray(props.children);
		
		function mapped(newProps){
			return children.map(function mapProp(child,key){
				const itemProps = newProps ? Object.assign({key},newProps) : {key};
				return React.createElement(Component,itemProps,child)
			})
		}
		
		mapped.items = children;

		return Object.assign({},props,{children:mapped})
	}
}