import isArray from '../utils/isArray';
import isString from '../utils/isString';
import isNil from '../utils/isNil';
import append from '../utils/append';

export default function mergeClassNames(A,B){

	const nilA = isNil(A);
	const nilB = isNil(B);

	if(nilA && nilB){return;}
	if(nilA){return B;}
	if(nilB){return A;}

	const arrA = isArray(A);
	const arrB = isArray(B);
	const strA = isString(A);
	const strB = isString(B);

	const C = ((arrA && arrB) || (strA && strB)) ? concat(A,B) :
		arrA ? append(B,A) :
		arrB ? append(A,B) :
		B
	;
	return C.length && C;
}