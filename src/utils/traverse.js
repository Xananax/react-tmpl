import isArray from './isArray';
import isObject from './isObject';

function _traverse(obj,fn,key,parent){
	fn(obj,key,parent);
	if(isObject(obj) || isArray(obj)){	
		Object.keys(obj).forEach(function(key){
			const val = obj[key];
			_traverse(val,fn,key,obj);
		})
	}
}

export default function traverse(obj,fn){
	return _traverse(obj,fn,null,obj);
}