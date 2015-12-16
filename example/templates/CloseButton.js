import React from 'react';
import Button from './Button'
import {
	compose
,	mergeAttributes
} from '../../src'

export default compose(
	'CloseButton'
,	mergeAttributes({
		text:'×'
	})
,	(props)=>(<Button {...props}/>)
)