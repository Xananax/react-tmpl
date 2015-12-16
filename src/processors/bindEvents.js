import merge from '../utils/merge';


export default function prepareBindEvents(events){

	
	return function mergeEvents(props){
		const context = this;
		if(!props){return props};
		const newProps = Object.assign({},props);
		events.forEach(function(name){
			if(name in props){
				newProps[name] = props[name].bind(context)
			}
		})
		return newProps;
	}


}