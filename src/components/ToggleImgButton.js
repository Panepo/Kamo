import React, { Component, PropTypes } from 'react'

export default class ToggleImgButton extends Component {
	render() {
		const { display, title, onClickFunc, modelId, Cactive, Cinactive, imgSrc } = this.props
		
		var bClassName = ""
		if ( display == modelId ) {
			bClassName = "mdl-button mdl-js-button mdl-js-ripple-effect " + Cactive
		} else {
			bClassName = "mdl-button mdl-js-button mdl-js-ripple-effect " + Cinactive
		}
		
		var srcTemp = imgSrc
		return (
			<button className={bClassName} onClick={onClickFunc.bind(null, modelId)}>
				<img src={srcTemp} alt={title} />
			</button>
		)
	}
}

ToggleImgButton.propTypes = {
	display: PropTypes.string,
	title: PropTypes.string,
	onClickFunc: PropTypes.func,
	modelId: PropTypes.string,
	Cactive: PropTypes.string,
	Cinactive: PropTypes.string,
	imgSrc: PropTypes.string
}
