import React from 'react';
import Button from './Button';

import {
	compose
,	pluckAttributes
,	mapProp
} from '../../src'

export default compose(
	'ButtonRow'
,	pluckAttributes()
,	mapProp('buttons',Button)
,	({attrs,buttons,children})=>(<section {...attrs}>{buttons()}{children}</section>)
)