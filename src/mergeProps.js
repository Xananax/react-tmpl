import {merge,assign} from 'jobj';

export default function mergeProps(...propsObjs){
	return merge(function(value,oldValue,key){
		if(key==='style'){
			return assign(oldValue,value)
		}
		if(key==='className'){
			if(oldValue){return oldValue.concat(value);}
			return [value];
		}
		if(/^[A-Z]/.test(key)){
			return mergeProps(value,oldValue);
		}
		return value;
	},...propsObjs);
}
