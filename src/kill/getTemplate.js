import {curry} from 'ramda';

export default curry(function getTemplate(Template,context){
	const templates = Template.templates;
	if(name in templates){return templates[name];}
	const defTemplates = context.getTemplates();
	if(name in defTemplates){return defTemplates[name];}
	throw new Error(`could not find the \`${name}\`template`);
});