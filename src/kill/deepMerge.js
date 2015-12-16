import {is,isNil,keys,concat,mergeWith} from 'ramda';

function merger(l,r){
	var isObj = is(Object);
	return (
		(isObj(l) && isObj(r)) ? mergeWith(merger, l, r) : 
		isNil(r) ? l :
		r
	)
}

export default mergeWith(merger);


