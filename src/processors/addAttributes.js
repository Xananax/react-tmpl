import mergeAttributes from './mergeAttributes';

export default function prepareAddAttributes(fx){

	return function addAttributes(B){
		return mergeAttributes(B).call(this,fx.call(this,B))
	}


}