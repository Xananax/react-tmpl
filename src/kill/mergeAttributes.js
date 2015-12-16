import mergeClassNames from './mergeClassNames';
import mergeStyles from './mergeStyles';

export default function mergeAttributes(...props){
	const styles = mergeStyles(...props);
	const className = mergeClassNames(...props);
}