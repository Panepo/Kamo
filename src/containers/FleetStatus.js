import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PieChart } from 'react-d3'
import ToggleButton from '../components/ToggleButton'
import { statusInitial, statusChange } from '../actions'
import { listStatusButton, listStatusButtonS } from '../constants/ConstList'
import '../../css/Status.css'

class FleetStatus extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	componentWillMount() {
		const { statusInitial, selectData } = this.props
		
		if (selectData.length > 0) {
			statusInitial(selectData)
		}
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
			<div className="page-content display-area">
				<div className="mdl-grid display-area">
					<div className="mdl-cell mdl-cell--4-col mdl-color--white">
						<div className="status-button mdl-shadow--4dp">
							<div className="mdl-grid">
								{buttOut}
							</div>
						</div>
						<div className="status-info mdl-shadow--4dp">
							4
						</div>
					</div>
					<div className="display-list mdl-cell mdl-cell--8-col mdl-color--white mdl-shadow--4dp">
						8
					</div>
				</div>
			</div>
		)
	}
}

FleetStatus.propTypes = {
	selectData: PropTypes.array.isRequired,
	statusData: PropTypes.array.isRequired,
	status: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		selectData: state.dbStore.dbCarrierSelect,
		statusData: state.statusStore.data,
		status: state.statusStore.status
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		statusInitial: bindActionCreators(statusInitial, dispatch),
		statusChange: bindActionCreators(statusChange, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FleetStatus)