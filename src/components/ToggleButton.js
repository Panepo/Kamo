import React, { Component, PropTypes } from 'react'

export default class ToggleButton extends Component {
	render() {
		const { display, title, onClickFunc, modelId, Cactive, Cinactive } = this.props
		
		var bClassName = ""
		if ( display == modelId ) {
			bClassName = Cactive
		} else {
			bClassName = Cinactive
		}
		
		return (
			<div className={bClassName} onClick={onClickFunc.bind(null, modelId)}>{title}</div>
		)
	}
}

ToggleButton.propTypes = {
	display: PropTypes.string,
	title: PropTypes.string,
	onClickFunc: PropTypes.func,
	modelId: PropTypes.string,
	Cactive: PropTypes.string,
	Cinactive: PropTypes.string
}
