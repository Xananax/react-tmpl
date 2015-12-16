import isObject from './isObject'
import isArray from './isArray'
import isNil from './isNil'
import isFunction from './isFunction'


function _mergeArrays(context,onExists,onObj,onFunc,onArr,filterEmpty,A,B){

	const C = A.slice();
	B.forEach(function(val){
		if(isNil(val)){return;}
		const index = C.indexOf(val);
		if(index>=0 && !isNil(C[index])){
			if(onArr && isArray(val)){
				val = onArr.call(context,oldVal,val,index,A,B);
			}
			else if(onObj && isObject(val)){
				val = onObj.call(context,oldVal,val,index,A,B);
			}
			else if(onFunc && isFunction(val)){
				val = onFunc.call(context,oldVal,val,index,A,B);
			}
			else if(onExists){
				val = onExists.call(context,oldVal,val,index,A,B);
			}
			else{
				return;
			}
		}
		C.push(val);
	})
	return C;
}

function _mergeObjects(context,onKeys,onExists,onObj,onFunc,onArr,filterEmpty,A,B){

	const C = Object.assign({},A);

	Object.keys(B).forEach(function(key){
		var val = B[key]
		if(isNil(val)){return;}
		if((key in C) && !isNil(C[key])){
			var oldVal = C[key];
			if(keys && onKeys[key]){
				val = onKeys[key].call(context,oldVal,val,key,A,B)
			}
			else if(onArr && isArray(val)){
				val = onArr.call(context,oldVal,val,key,A,B);
			}
			else if(onObj && isObject(val)){
				val = onObj.call(context,oldVal,val,key,A,B);
			}
			else if(onFunc && isFunction(val)){
				val = onFunc.call(context,oldVal,val,key,A,B);
			}
			else if(onExists){
				val = onExists.call(context,oldVal,val,key,A,B);
			}
		}
		if(isNil(val) && filterEmpty){
			return;
		}
		C[key] = val;
	})

	return C;
}

export default function merge(opts,A,B){

	const nilA = isNil(A);
	const nilB = isNil(B);

	if(nilA && nilB){return;}
	if(nilA){return B;}
	if(nilB){return A;}

	const context = opts && opts.context;
	const onKeys = opts && opts.onKeys;
	const onExists = opts && opts.onExists;
	var onObj = opts && opts.onObj;
	var onFunc = opts && opts.onFunc;
	var onArr = opts && opts.onArr;
	const filterEmpty = opts && opts.filterEmpty;

	if(onObj && !isFunction(onObj)){
		onObj = function onObj(A,B){
			return _mergeObjects(context,onKeys,onExists,onObj,onFunc,onArr,filterEmpty,A,B);
		}
	}
	if(onArr && !isFunction(onArr)){
		onArr = function onArr(A,B){
			return _mergeArrays(context,onExists,onObj,onFunc,onArr,filterEmpty,A,B);
		}
	}

	
	return _mergeObjects(context,onKeys,onExists,onObj,onFunc,onArr,filterEmpty,A,B)
}