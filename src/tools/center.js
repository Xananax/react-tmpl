export default function prepareCenter(windowSizePropName='windowSize',ownSizePropName='ownSize'){

	return function center(props){
		if(windowSizePropName in props && ownSizePropName in props){
			const {vh,vw} = this.props[windowSizePropName];
			const {width,height} = this.props[ownSizePropName];
			const top = (vh > height) ? (vh - height)/2 : 0;
			const left = (vw > width) ? (vw - width)/2 : 0;
			return {
				top
			,	left
			}
		}
		return null;
		
	}

}