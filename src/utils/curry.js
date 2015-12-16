export default function curry(fx,n,...args){

	var arity = n || fx.length;

	return function curried(...newArgs){
		const finalArgs = args.concat(newArgs);
		if(finalArgs.length >= arity) {
			return fx.apply(null,finalArgs);
		}
		else{
			return curry(curried,arity,...finalArgs);
		}
	};
}
