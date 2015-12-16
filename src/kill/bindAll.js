export default function bind(bindables,context){
	if(bindables && bindables.length){
		bindables.forEach(key=>{
			context[key] = context[key].bind(context);
		})
	}
}