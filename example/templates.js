import React from 'react';
import ReactDOM from 'react-dom';
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
			{buttons.map(this.Button)}
		</section>)
	}
,	{
		Button:{}
	}
)

template(
	function KitchenSink(props){
		return(<span {...props}>
			some text
		</span>)
	}
,	{
		style:{
			background:'blue'
		,	hover:{background:'red'}
		,	focus:{border:'dashed 1px red'}
		}
	}
)

template(
	function Modal(props){
		const closeButton = this.CloseButton();
		return (<div {...props} role="dialog" aria-labelledby={props.slug} ref='node'>
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
	,	plugins:[
			template.plugins.windowResize
		]
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
		,	top:prop('top')
		,	left:prop('left')
		}
	,	css:{
			minWidth:300
		,	minHeight:300
		,	background:'#fff'
		,	padding:'1em'
		,	borderRadius:'2px'
		,	boxShadow:'0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)'
		}
	,	processProps(locals){
			if(this.refs.node){
				const {vw,vh} = this.state;
				const {clientWidth,clientHeight} = this.refs.node;
				const top = (vh > clientHeight) ? ((vh - clientHeight) / 2) : 0;
				const left = (vw > clientWidth) ? ((vw - clientWidth) / 2) : 0;
				locals.props.top = top;
				locals.props.left = left;
			}
			return locals;
		}
	,	buildLocals(locals){
			locals.props.slug = this.slug(locals.props.title);
			return locals;
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
