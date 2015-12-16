export default function prepareRender(Template,context,givenProps){
	const template = Template.template;
	const locals = buildLocals(Template,context,state,givenProps)	
	return template.call(context,locals.props,locals);
}