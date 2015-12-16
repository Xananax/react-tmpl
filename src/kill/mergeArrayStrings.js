import {is,concat} from 'ramda';

const isArr = is(Array);
const isStr = is(String);


export default mergeArrayStrings(_A,_B){

	const A = _A.className;
	const B = _B.className;

	if(!A && !B){return;}

	const arrA = isArr(A);
	const arrB = isArr(B);
	const strA = isStr(A);
	const strB = isStr(B);

	const classes = ((arrA && arrB) || (strA && strB)) ? concat(A,B) :
		arrA ? append(B,A) :
		arrB ? append(A,B) :
		B
	;
	return classes.length && classes;
}