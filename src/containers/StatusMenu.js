import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import { statusChange } from '../actions'
import { listStatusButton, listStatusButtonS } from '../constants/ConstList'

class StatusMenu extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { status, statusChange } = this.props
		
		var buttTemp
		var buttOut = []
		for (var i=0; i<listStatusButton.length; i++){
			buttTemp = (
				<div key={"status-button" + i.toString()} className="mdl-cell mdl-cell--3-col">
					<ToggleButton
						modelId={listStatusButtonS[i]}
						key={"status-button" + i.toString()}
						display={status}
						onClickFunc={(modelId) => statusChange(modelId)}
						Cactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
						Cinactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent"}
						title={listStatusButton[i]} />
				</div>
			)
			buttOut.push(buttTemp)
		}

		return (
		<div className="status-button mdl-shadow--4dp">
			<div className="mdl-grid">
				{buttOut}
			</div>
		</div>
		)
	}
}

StatusMenu.propTypes = {
	status: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		status: state.reducerStatus.status
	}
}

export default connect(
	mapStateToProps,
	{ statusChange }
)(StatusMenu)