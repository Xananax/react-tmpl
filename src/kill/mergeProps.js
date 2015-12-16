import {merge,curryN} from 'ramda';
import mergeClassNames from './mergeClassNames';
import mergeStyles from './mergeStyles';
import mergeEventsHandlers from './mergeEventsHandlers'

export default curryN(4,mergeProps(Template,context,state,givenProps,...additional){

	const className = mergeClassNames(givenProps);

	const style = mergeStyles(Template,givenProps && givenProps.includeCSS,state,givenProps);

	const eventsHandlers = mergeEventsHandlers(Template.bindables,context)

	return merge(
		Template.props.self
	,	givenProps
	,	eventsHandlers
	,	className && {className}
	,	style && {style}
	,	...additional
	);
});