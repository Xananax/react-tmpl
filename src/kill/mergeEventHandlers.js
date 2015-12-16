import {curry,props} from 'ramda';

export default curry(function mergeEventHandlers(context,list){
	if(!list || !list.length){return;}
	return props(list,context);
});