import {curry,isNil} from 'ramda';
import getTemplate from './getTemplate';

export default curry(fillTemplate(Template,context,state,name,givenProps,key){
	const template = getTemplate(Template,context)
	const defaultProps = template.props.self;
	const props = mergeProps(
		template
	,	context
	,	state
	,	givenProps
	,	!isNil(key) && {key}
	);
	return React.createElement(template,props);
});