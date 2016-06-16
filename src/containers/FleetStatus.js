import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StatusMenu from './StatusMenu'
import StatusInfo from './StatusInfo'
import StatusD3 from './StatusD3'
import { statusInitial } from '../actions'
import {  } from '../constants/ConstList'
import '../../css/Status.css'

class FleetStatus extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	componentWillMount() {
		const { statusInitial, selectData, airControl } = this.props
		
		if (selectData.length > 0) {
			statusInitial( airControl )
		}
	}
	
	render() {
		const {  } = this.props

		return (
			<div className="page-content display-area">
				<div className="mdl-grid display-area">
					<div className="mdl-cell mdl-cell--6-col">
						<StatusMenu />
						<StatusInfo />
					</div>
					<div className="display-list mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--4dp">
						<StatusD3 />
					</div>
				</div>
			</div>
		)
	}
}

FleetStatus.propTypes = {
	airControl: PropTypes.number.isRequired,
	selectData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		airControl: state.dbStore.airControl,
		selectData: state.dbStore.dbCarrierSelect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		statusInitial: bindActionCreators(statusInitial, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FleetStatus)