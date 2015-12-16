import React from 'react';
import {
	compose
,	mergeAttributes
,	cssToStyle
} from '../../src'

export default compose(
	'Header'
,	mergeAttributes({
		css:{			
			margin:0
		,	marginBottom:'1em'
		,	borderBottom:'1px solid #ccc'
		}
	})
,	cssToStyle()
,	({style,text,additional})=>(<nav><h1 style={style}>{text}</h1>{additional}</nav>)
)