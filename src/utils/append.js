import isArray from './isArray';

export default function append(arr,obj){
	if(isArray(obj)){
		return arr.concat(obj);
	}
	const newArr = arr.slice();
	newArr.push(obj);
	return newArr;
}
