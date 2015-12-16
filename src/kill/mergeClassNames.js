import {reduce,pluck} from 'ramda';
import mergeArrayStrings from './mergeArrayStrings';

const _mergeClassNames = reduce(mergeArrayStrings,{});
const pluckClasses = compose(filter(Boolean),pluck('className'))

export default function mergeClassNames(...objs){
	return _mergeClassNames(pluckClasses(objs));
}