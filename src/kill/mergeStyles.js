import {set,pluck,reduce,compose,curryN} from 'ramda';
import deepMergeAll from './deepMergeAll';

const pluckStyles = compose(filter(Boolean),pluck('style'))

export default function mergeStyle(...props){
	return deepMergeAll(pluckStyles(props));
}