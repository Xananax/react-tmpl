import {set,pluck,reduce,compose,curryN} from 'ramda';
import deepMergeAll from './deepMergeAll';

const pluckStyles = compose(filter(Boolean),pluck('style'))

export default curryN(3,function buildStyle(Template,includeCSS,state,...props){
	return deepMergeAll([
		includeCSS && Template.css
	,	Template.style
	,	...pluckStyles(props)
	,	state.hover && Template._hoverStyle
	,	state.focus && Template._focusStyle
	])
})