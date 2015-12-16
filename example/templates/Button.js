import React from 'react';
import {
	compose
,	pluckAttributes
,	cssToStyle
} from '../../src';

export default compose(
	'Button'
,	cssToStyle()
,	pluckAttributes()
,	function Button({attrs,text,children}){
		return <button {...attrs}>{text}{children}</button>
	}
)