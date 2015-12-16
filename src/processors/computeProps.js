import isFunction from '../utils/isFunction'
import isArray from '../utils/isArray'
import isObject from '../utils/isObject'

function traverse(props,newProps,root,context){

	Object.keys(props).forEach(function(key){
		const val = props[key];
		if(isFunction(val)){
			if(val.execute){
				newProps[key] = val.call(context,root)
			}else{
				newProps[key] = val;
			}
		}
		else if(isObject(val)){
			newProps[key] = traverse(val,{},root,context);
		}
		else if(isArray(val)){
			newProps[key] = traverse(val,[],root,context);
		}
		else{
			newProps[key] = val;
		}
	})

	return newProps;

}

export default function prepareComputeProps(){

	return function computeProps(props){
		if(!props){return props;}

		const context = this;

		const newProps = traverse(props,{},props,context)

		return newProps;

	}
}