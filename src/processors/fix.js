function _fix(props){
	const additional = {};
	var add = false;
	if((props.onBlur || props.onFocus) && !props.tabIndex){
		additional.tabIndex = {};
		add = true;
	}
	if(props.value && !props.onChange){
		additional.defaultValue = value;
		additional.value = null;
	}
	if(add){
		return Object.assign({},props,additional);
	}
	return props;
}

export default function prepareFix(){

	return function fix(props){
		if(props.attrs){
			const newAttrs = _fix(props.attrs);
			if(newAttrs != props.attrs){
				return Object.assign({},props,{attrs:newAttrs})
			}
		}
		return _fix(props);
	}
}