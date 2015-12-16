import merge from '../utils/merge';


function onFunc(oldVal,val,key){
	if(/^on/.test(key)){
		return function eventHandler(evt){
			val.call(this,evt);
			oldVal.call(this.evt);
		}
	}
	return val;
}

export default function prepareMergeEvents(A){

	return function mergeEvents(B){
		return merge({onFunc,context:this},A,B);
	}


}