import React from 'react';
import CloseButton from './CloseButton'
import Button from './Button'
import ButtonRow from './ButtonRow'
import Contents from './Contents'
import Header from './Header'
import Link from './Link'
import {
	compose
,	windowResize
,	ownSize
,	addAttributes
,	mergeAttributes
,	cssToStyle
,	pluckAttributes
,	computeProps
,	wrapChildren
,	embedComponentsAttributes
,	prop
} from '../../src';

export default ownSize(windowResize(class Modal extends React.Component{
	constructor(props){
		super(props);
	}

	locals = compose(
		'buildLocals'
	,	addAttributes(function({title}){
			const {vh,vw} = this.props.windowSize;
			const {width,height} = this.props;
			const top = (vh > height) ? (vh - height)/2 : 0;
			const left = (vw > width) ? (vw - width)/2 : 0;
			const slug = title.replace(/[\s*&%$#]/g,'-')
			return {
				slug
			,	top
			,	left
			,	width
			,	height
			}
		})
	,	mergeAttributes({
			className:['modal',prop('isOpen','modal-open')]
		,	'aria-labelledby':prop('slug')
		,	CloseButton:{
				css:{
					position:'absolute'
				,	top:'1em'
				,	right:'1em'
				}
			,	onClick:prop('onClose')
			}
		,	Header:{
				text:prop('title')
			,	id:prop('slug')
			}
		,	Contents:{
				contents:prop('contents')
			}
		,	ButtonRow:{
				contents:prop('actions')
			,	className:'actions'
			}
		,	style:{
				position:'absolute'
			,	top:prop('top')
			,	left:prop('left')
			,	width:prop('width')
			,	height:prop('height')
			}
		,	css:{
				minWidth:300
			,	minHeight:300
			,	background:'#fff'
			,	padding:'1em'
			,	borderRadius:'2px'
			,	boxShadow:'0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)'
			}	
		})
	,	cssToStyle()
	,	computeProps()
	,	pluckAttributes()
	,	wrapChildren(Contents)
	,	embedComponentsAttributes({
			CloseButton
		,	Header
		,	Contents
		,	ButtonRow
		})
	)
	render(){
		const {attrs,Header,Contents,children,ButtonRow,CloseButton} = this.locals(this.props);
		return (<div {...attrs}>
			{Header({additional:CloseButton()})}
			{Contents()}
			{children()}
			{ButtonRow()}
		</div>)
	}
}))