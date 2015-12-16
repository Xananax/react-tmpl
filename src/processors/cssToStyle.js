import mergeStyles from '../tools/mergeStyles';

function noOp(props){return props;}

function cssToStyle(props){
	if(!props || !('css' in props)){return props;}
	const style = ('style' in props) ? mergeStyles(props.style,props.css) : Object.assign({},props.css);
	return Object.assign({},props,{style})
}

export default function prepareCssToStyle(doNotProcess){

	if(doNotProcess){
		return noOp;
	}

	return cssToStyle;
	
}