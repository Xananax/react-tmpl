import attributes from '../consts/attributes';
import mergeAttributes from './mergeAttributes'
import merge from '../utils/merge';

function isHTMLAttribute(key){
	return (attributes.indexOf(key)>=0)
}

export default function preparePluckAttributes(propName='attrs'){

	return function pluckAttributes(props){

		if(!props){return;}

		const retprops = {};
		var attrs = {};
		var hasAttrs = false;
		var hasProps = false;

		Object.keys(props).forEach(function(key){
			const val = props[key];
			if(isHTMLAttribute(key)){
				hasAttrs = true;
				attrs[key] = val
			}
			else if(key == propName){
				attrs = hasAttrs ? mergeAttributes(attrs,val) : Object.assign({},val);
			}
			else{
				hasAttrs = true;
				retprops[key] = val;
			}
		})
		if(hasAttrs){
			retprops.attrs = attrs;
			hasProps = true;
		}
		if(hasProps){
			return retprops;
		}
		return props;
	}

};