import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import StatusMenu from './StatusMenu'
import StatusInfo from './StatusInfo'
import StatusD3 from './StatusD3'
import { statusInitial } from '../actions'
import '../../css/Status.css'

class FleetStatus extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	componentWillMount () {
		const { statusInitial, airControl, airDamage } = this.props
		statusInitial( airControl, airDamage )
	}
	
	render() {

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
	airDamage: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
	return {
		airControl: state.reducerGroup.airControl,
		airDamage: state.reducerGroup.airDamage
	}
}

export default connect(
	mapStateToProps,
	{ statusInitial }
)(FleetStatus)