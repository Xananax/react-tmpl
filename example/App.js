import React,{Component} from 'react';
import {
	Button
,	ButtonRow
,	CloseButton
,	Contents
,	Header
,	Link
,	Modal
} from './templates'

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
			<Modal title='hehe'>hello world</Modal>
		</div>)
	}
}


export default App
