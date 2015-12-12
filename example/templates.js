import React from 'react';
import template,{prop} from '../src';

template(
	function Button(props,key){
		if(props.action){
			props.onClick = props.action;
			delete props.action;
		}
		return (<button {...props} key={key}>{props.text}</button>);
	}
,	{
		className:'button'
	}
)

template(
	function CloseButton(props){
		return this.Button(props)
	}
,	{
		Button:{
			text:'×'
		}
	,	className:'close'
	}
)

template(
	function Header({text,additional,style}){
		return (<nav>
			<h1 style={style}>{text}</h1>
			{additional && (<span>{additional}</span>)}
		</nav>)
	}
,	{
		css:{
			margin:0
		,	marginBottom:'1em'
		,	borderBottom:'1px solid #ccc'
		}
	}
)

template(
	function Contents({contents,style},key){
		if(Array.isArray(contents)){
			return (<span>
				{contents.map((contents,key)=>Contents({contents,style},key))}
			</span>)
		}
		return (<section key={key} style={style}>{contents}</section>);
	}
,	{
		css:{
			borderBottom:'1px solid #ccc'
		,	padding:'1em 0 1em 0'
		}
	}
)

template(
	function ButtonRow({buttons,style}){
		const Button = template.Button;
		if(!buttons){return null;}
		return (<section style={style}>
			{buttons.map((button,key)=>
				(button.text && button.action && <Button action={button.action} text={button.text} key={key}/>) ||
				button
			)}
		</section>)
	}
)

template(
	function Modal(props){
		const closeButton = this.CloseButton();
		return (<div {...props} role="dialog" aria-labelledby={props.slug}>
			{this.Header({additional:closeButton})}
			{props.children}
			{this.Contents()}
			{this.ButtonRow()}
		</div>)
	}
,	{
		propTypes:['onClose','title']
	,	className:[
			'modal'
		,	{
				'modal-open':prop('isOpen')
			}
		]
	,	state:{
			width:400
		,	height:300
		,	docWidth:0
		,	docHeight:0
		,	top:0
		,	left:0
		}
	,	calculateSize(){
			const docHeight = window.innerHeight;
			const docWidth = window.innerWidth;
			if(docHeight!==this.state.docHeight || docWidth!==this.state.docWidth){
				const width = (docWidth/3)*2;
				const height = 300;
				const top = (docHeight - height)/2;
				const left = (docWidth - width)/2;
				this.setState({
					docWidth
				,	docHeight
				,	width
				,	top
				,	left
				,	height
				})
			}
		}
	,	onResize(){
			this.calculateSize();
		}
	,	componentDidMount(){
			window.addEventListener("resize",this.onResize);
			this.calculateSize();
		}
	,	style:{
			position:'absolute'
		,	width:prop((locals,obj)=>obj.state.width)
		,	height:prop((locals,obj)=>obj.state.height)
		,	top:prop((locals,obj)=>obj.state.top)
		,	left:prop((locals,obj)=>obj.state.left)
		}
	,	css:{
			minWidth:300
		,	minHeight:300
		,	background:'#fff'
		,	padding:'1em'
		,	borderRadius:'2px'
		,	boxShadow:'0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)'
		}
	,	buildLocals(props){
			props.slug = this.slug(props.title);
			return props;
		}
	,	slug(title){
			return title.replace(/[\s*&%$#]/g,'-');
		}
	,	CloseButton:{
			onClick:prop('onClose')
		,	style:{
				position:'absolute'
			,	top:'1em'
			,	right:'1em'
			}
		,	className:'modal-button'
		}
	,	Contents:{
			contents:prop('contents')
		}
	,	ButtonRow:{
			buttons:prop('actions')
		,	style:{
				position:'absolute'
			,	bottom:'1em'
			}
		}
	,	Header:{
			text:prop('title')
		,	id:prop('slug')
		}
	}
)

export default template;
