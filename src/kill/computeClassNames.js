import {is} from 'ramda'
import cx from 'classnames';

const isArr = is(Array);

export default function computeClassNames(classNames){
	if(!classNames || !classNames.length){return;}
	return isArr(classNames) ? cx(...classNames) : cx(classNames)
}