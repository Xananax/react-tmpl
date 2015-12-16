import React from 'react';
import ReactDOM from 'react-dom';
import elementResizeDetectorMaker from 'element-resize-detector';

export default function(Comp,propName='ownSize',strategy='scroll'){

	const erd = elementResizeDetectorMaker({strategy})

	return class OwnSizeListener extends React.Component{
		constructor(props,context){
			super(props,context);
			this.updateOwnDimensions = this.updateOwnDimensions.bind(this);
			this.state = {width:0,height:0}
		}
		componentDidMount(){
			const node = ReactDOM.findDOMNode(this.refs.component);
			erd.listenTo(node,this.updateOwnDimensions)
		}
		componentWillUnMount(){
			const node = ReactDOM.findDOMNode(this.refs.component);
			erd.removeListener(node,this.updateOwnDimensions);
		}
		updateOwnDimensions(el){
			const {offsetWidth,offsetHeight} = el;
			this.setState({
				width:offsetWidth
			,	height:offsetHeight
			})
		}
		render(){
			const props = Object.assign({},this.props,{[propName]:this.state});
			return <Comp ref='component' {...props}/>
		}
	}
}
