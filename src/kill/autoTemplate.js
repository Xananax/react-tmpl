import fillTemplate from './fillTemplate';


export default autoTemplate(Template,context,state,locals,name,passedProps,key){
	if(!passedProps && !locals[name]){return null;}
	const props = passedProps ? merge(locals[name],passedProps) : locals[name];
	passedProps.includeCSS = givenProps.includeCSS;
	return fillTemplate(Template,context,state,name,passedProps,key)
}