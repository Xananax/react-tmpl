import React,{Component} from 'react';
import templates from './templates'

const {Modal,KitchenSink} = templates;

class App extends Component{

	constructor(props,context){
		super(props,context)
		this.state = {open:false,inc:0}
	}

	render(){
		return (<div>
			<button
				onClick={()=>this.setState({open:!this.state.open})}
				>
					{this.state.open?'close':'open'}
			</button>
			<KitchenSink>sdfsdfsf</KitchenSink>
			<Modal
				onClose={()=>this.setState({open:false})}
				title="I am a modal box"
				isOpen={this.state.open}
				includeCSS={true}
				contents={[
					'a piece of content'
				,	<p>another piece of content</p>
				]}
				actions={[
					{text:'inc',action:()=>this.setState({inc:this.state.inc+1})}
				,	{text:'dec',action:()=>this.setState({inc:this.state.inc-1})}
				]}
				>
				<div>{this.state.inc}</div>
			</Modal>
		</div>)
	}
}


export default App
