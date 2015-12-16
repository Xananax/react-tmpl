import merge from 'ramda';
import mergeProps from './mergeProps';
import compute from './compute';
import computeClassNames from './computeClassNames';

export default function buildLocals(Template,context,state,givenProps){

	const props = mergeProps(Template,context,state,givenProps)

	if(props.className){
		props.className = computeClassNames(props.className);
	}

	const locals = merge({props},Template.props.children);

	return compute(locals)

}