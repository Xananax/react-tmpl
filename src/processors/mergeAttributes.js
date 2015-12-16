import isNil from '../utils/isNil'
import mergeStyles from '../tools/mergeStyles'
import mergeClassNames from '../tools/mergeClassNames';
import merge from '../utils/merge';


export default function prepareMergeAttributes(A){

	if(isNil(A)){return function noOp(B){return B;}}

	return function mergeAttributes(B){
		return merge(
			{
				onKeys:{
					style:mergeStyles
				,	className:mergeClassNames
				}
			,	onObj:true
			,	context:this
			}
		,	A
		,	B
		);
	}


}