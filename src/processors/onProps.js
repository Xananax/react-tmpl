import isFunction from '../utils/isFunction'
import mergeAttributes from './mergeAttributes'

export default function prepareOnProps(predicate,action){

	if(!isFunction(predicate)){
		const prop = predicate;
		predicate = function checkProps(props){
			return (props[prop]);
		}
	}

	if(!isFunction(action)){
		const propsToMerge = action;
		action = function mergeProps(props){
			return mergeAttributes(props,propsToMerge);
		}
	}

	return function onProps(props){
		if(predicate(props)){
			return action(props);
		}
		return props;
	}

}