import React from 'react';
import {
	compose
,	mergeAttributes
,	cssToStyle
,	pluckAttributes
,	wrapChildren
,	mapProp
} from '../../src'

const Contents = compose(
	'Contents'
,	mergeAttributes({
		css:{
				borderBottom:'1px solid #ccc'
			,	padding:'1em 0 1em 0'
		}	
	})
,	cssToStyle()
,	pluckAttributes()
,	mapProp('contents','section')
,	wrapChildren('section')
,	({attrs,contents,children})=>(<span>
		{contents(attrs)}
		{children(attrs)}
	</span>)
)

export default Contents;