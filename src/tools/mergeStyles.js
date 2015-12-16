import merge from '../utils/merge';

const opts = {
	onObj:true
}

export default function mergeStyles(A,B){

	return merge(opts,A,B)

}