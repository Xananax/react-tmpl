import isFunction from '../utils/isFunction'
import mergeAttributes from './mergeAttributes'

export default function prepareOnState(predicate,action){

	if(!isFunction(predicate)){
		const prop = predicate;
		predicate = function checkState(props){
			return (this.state[prop]);
		}
	}

	if(!isFunction(action)){
		const propsToMerge = action;
		action = function mergeProps(props){
			return mergeAttributes(props,propsToMerge);
		}
	}

	return function onState(props){
		if(predicate(props)){
			return action(props);
		}
		return props;
	}

}