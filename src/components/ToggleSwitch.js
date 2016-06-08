import React, { Component, PropTypes } from 'react'

export default class ToggleSwitch extends Component {
	render() {
		const { display, title, onClickFunc, modelId, classes } = this.props
	
		if ( display == modelId ) {
			return (
				<label className={classes + " mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"} htmlFor={modelId + " checkbox"}>
					<input type="checkbox" id={modelId + " checkbox"} className="mdl-checkbox__input" onClick={onClickFunc.bind(null, modelId)} defaultChecked />
					<span className="mdl-checkbox__label">{title}</span>
				</label>
			)
		} else {
			return (
				<label className={classes + " mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"} htmlFor={modelId + " checkbox"}>
					<input type="checkbox" id={modelId + " checkbox"} className="mdl-checkbox__input" onClick={onClickFunc.bind(null, modelId)} />
					<span className="mdl-checkbox__label">{title}</span>
				</label>
			)
		}
		
	}
}

ToggleSwitch.propTypes = {
	classes: PropTypes.string,
	display: PropTypes.string,
	title: PropTypes.string,
	onClickFunc: PropTypes.func,
	modelId: PropTypes.string
}
