import React from 'react';
import {
	compose
,	mergeEvents
,	mergeAttributes
,	pluckAttributes
,	bindEvents
,	computeProps
,	state
,	fix
} from '../../src';

class Link extends React.Component{
	constructor(props){
		super(props);
		this.state = {hover:false};
	}
	locals = compose(
		'buildLocals'
	,	mergeEvents({
			onMouseEnter(evt){this.setState({hover:true})}
		,	onMouseOut(evt){this.setState({hover:false})}
		,	onFocus(evt){this.setState({focus:true})}
		,	onBlur(evt){this.setState({focus:false})}
		})
	,	mergeAttributes({
			style:{
				background:state('focus','red','blue')
			,	border:state('hover','dashed 1px red')
			}
		})
	,	computeProps()
	,	bindEvents(['onMouseEnter','onMouseOut','onFocus','onBlur'])
	,	pluckAttributes()
	,	fix()
	)
	render(){
		const {attrs,text} = this.locals(this.props);
		return (<a {...attrs}>{text}</a>)
	}
}

export default Link