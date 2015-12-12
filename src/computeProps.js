import GetProp from './GetProp';
import {transform} from 'jobj';

function _computeProps(context,currentObj,computedProps){
	function process(val){
		if(typeof val == 'undefined'){return;}
		if(val && val.constructor===Object){
			return _computeProps(context,val,computedProps)
		}
		if(val && val instanceof GetProp){
			val = val.get(context,computedProps)
		}
		if(Array.isArray(val)){
			return val.map(process)
		}
		return val;
	}
	if(Array.isArray(currentObj)){
		return currentObj.map(process)
	}
	return transform(currentObj,process);
}

export default function computeProps(context,computedProps){
	const props = _computeProps(context,computedProps,computedProps);
	return props;
}
