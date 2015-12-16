import GetProp from './GetProp';
import {map,curry,isNil,is} from 'ramda';

function computeVal(val){
	if(isNil(val)){return;}
	if(is(Object,val)){return computeProps(context,val);}
	if(val instanceof GetProp){return val.get(this,obj);}
	if(is(Array,val)){return val.map(compute);}
	return val;
}

export default curry(function compute(context,obj){
	const _computeVal = computeVal.bind(context);
	return map(_computeVal,obj);
})