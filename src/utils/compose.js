import isFunction from './isFunction';

export default function compose(name,...fns){

	fns = fns.filter(isFunction);

	function composed(args){

		const context = this;

		fns.forEach(function(fn){
			args = fn.call(context,args);
		});
		
		return args;
	}

	composed.displayName = name;

	return composed;
}