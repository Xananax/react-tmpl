import {onResize} from 'jobj';

function updateDimensions({win,doc}){
	this.setState({
		vw:win.width
	,	vh:win.height
	,	dw:doc.width
	,	dh:doc.height
	});
}

export default function(props,state){

	const _updateDimensions = updateDimensions.bind(this);

	const {doc,win,dispose} = onResize(_updateDimensions);

	this.replaceMethod('componentWillUnmount',dispose);

	Object.assign(state,{
		vw:win.width
	,	vh:win.height
	,	dw:doc.width
	,	dh:doc.height
	});

	return state;
}