import plugins from './plugins'
import buildTemplate from './buildTemplate';
import Template from './Template';
import GetProp from './GetProp';

export function prop(fn){
	return new GetProp(fn);
}

export function createTemplates(){
	function boundBuildTemplate(render,...mixins){
		const conf = mixins.pop()
		return buildTemplate(render,conf,boundBuildTemplate,...mixins);
	}
	boundBuildTemplate.prop = prop;
	boundBuildTemplate.plugins = plugins;
	return boundBuildTemplate;
}

const defaultSystem = createTemplates();

export default defaultSystem;
