import React from 'react';
import {onResize} from 'jobj';


export default function makeWindowResizer(Comp,propName='windowSize'){

	return class WindowResizer extends React.Component{

		constructor(props,context){
			super(props,context);

			this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

			const {doc,win,dispose} = onResize(this.updateWindowDimensions);

			this.componentWillUnmount = dispose;

			this.state = {
				vw:win.width
			,	vh:win.height
			,	dw:doc.width
			,	dh:doc.height
			};
			
		}
		updateWindowDimensions({win,doc}){
			this.setState({
				vw:win.width
			,	vh:win.height
			,	dw:doc.width
			,	dh:doc.height
			});
		}
		render(){
			const props = Object.assign({},this.props,{[propName]:this.state});
			return <Comp {...props}/>
		}
	}
	
}