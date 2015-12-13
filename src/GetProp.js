import {getNestedProperty} from 'jobj';

class GetProp{
	constructor(fn){
		if(typeof fn !== 'function'){
			const path = fn;
			fn = function(locals){
				return locals.props[path];
			}
		}
		this.fn = fn;
	}
	get(context,props){
		const fn = this.fn;
		return fn.call(context,props,context);
	}
}

export default GetProp;
