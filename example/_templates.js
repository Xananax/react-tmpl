import React from 'react';
import ReactDOM from 'react-dom';
import template,{prop} from '../src';

const Button = {
	displayName:'Button'
,	node:[
		'button'
	,	{
			style:{}
		,	className:{}
		}
	,	[prop,'text']
	]
}

const CloseButton = {
	displayName:'CloseButton'
,	node:[
		Button
	,	{
			text:'×'
		}
	]
}

const Header = {
	displayName:'Header'
,	node:[
		'nav'
	,	['h1',{style:[prop,'style']},[prop,'text']]
	,	[prop,'additional']
	]
,	css:{		
		margin:0
	,	marginBottom:'1em'
	,	borderBottom:'1px solid #ccc'
	}
}


const Contents = {
	displayName:'Contents'
,	render(props,template){
		if(Array.isArray(props.contents)){
			return (<span>
				{props.contents.map((contents,key)=>XXXXXXXX(merge(props,{contents}),key))}
			</span>)
		}
		return template(props);
	}
,	node:[
		'section'
	,	{
			style:[prop,'style']
		}
	,	[prop,'contents']
	]
,	css:{
			borderBottom:'1px solid #ccc'
		,	padding:'1em 0 1em 0'
	}
}

const ButtonRow = {
	displayName:'ButtonRow'
,	node:[
		'section'
	,	{style:[prop,'style']}
	,	[prop,'buttons',[Button]]
	]
}

const Link = {
	displayName:'Link'
,	node:[
		'a'
	,	{
			style:{
				background:'blue'
			,	hover:{background:'red'}
			,	focus:{border:'dashed 1px red'}
			}
		}
	,	[prop,'text']
	]
}


const Modal = {
	displayName:'Modal'
,	node:[
		'div'
	,	{
			className:[
				'modal'
			,	{
					'modal-open':[prop,'isOpen']
				}
			]
		,	'aria-labelledby':[prop,'slug']
		,	style:{
				position:'absolute'
			,	top:[prop,'top']
			,	left:[prop,'left']
			}
		,	css:{
				minWidth:300
			,	minHeight:300
			,	background:'#fff'
			,	padding:'1em'
			,	borderRadius:'2px'
			,	boxShadow:'0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)'
			}
		}
	,	[Header,{
			title:[prop,'title']
		,	id:[prop,'slug']
		,	additional:[
				CloseButton
			,	{
					css:{
						position:'absolute'
					,	top:'1em'
					,	right:'1em'
					}
				,	onClick:[prop,'onClose']
				}
			]
		}]
	,	[prop,'children']
	,	[Contents,{contents:[prop,'contents']}]
	,	[ButtonRow,{actions:[prop,'actions']}]
	]
,	props:{
		slug:[prop,'title',(title)=>title.replace(/[\s*&%$#]/g,'-')]
		top:[prop,({vh,height})=>(vh > height) ? (vh - height)/2 : 0]
		left:[prop,({vw,width})=>(vw > width) ? (vw - width)/2 : 0]
	}
,	required:['title','onClose']
,	use:[
		ownSize('width','height')
	,	windowSize('vh','vw')
	]
}

export default template;
