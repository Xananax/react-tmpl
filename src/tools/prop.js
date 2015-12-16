export default function prepareProp(propName,ifExists,ifNotExists){

	const ifExistsProvided = (typeof ifExists !== 'undefined');

	function prop(props){
		if(
			!(propName in props) ||
			props[propName] === false ||
			props[propName] === null
		){
			return ifNotExists;
		}
		return ifExistsProvided ? ifExists : props[propName];
	}

	prop.execute = true;
	return prop;
}