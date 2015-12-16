export default function prepareState(propName,ifExists,ifNotExists){

	const ifExistsProvided = (typeof ifExists !== 'undefined');

	function state(props){
		if(
			!(propName in this.state) || 
			this.state[propName]=== false || 
			this.state[propName] === null
		){
			return ifNotExists;
		}
		return ifExistsProvided ? ifExists : this.state[propName];
	}

	state.execute = true;
	return state;
}