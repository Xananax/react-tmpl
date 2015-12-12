import buildTemplate from './buildTemplate';
import Template from './Template';
import GetProp from './GetProp';

export function prop(fn){
	return new GetProp(fn);
}

export function createTemplates(){
	function boundBuildTemplate(render,conf){
		return buildTemplate(render,conf,boundBuildTemplate);
	}
	boundBuildTemplate.prop = prop;
	return boundBuildTemplate;
}

const defaultSystem = createTemplates();

export default defaultSystem;
