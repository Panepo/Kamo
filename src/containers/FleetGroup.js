import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Aircrafts from './Aircrafts'
import Carriers from './Carriers'

class FleetGroup extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const {  } = this.props
		
		return (
			<div className="page-content">
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--2-col mdl-color--white">
						<Aircrafts />
					</div>
					<div className="mdl-cell mdl-cell--4-col mdl-color--white mdl-shadow--4dp">
						<Carriers />
					</div>
					<div className="mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--4dp">6</div>
				</div>
			</div>
		)
	}
}

FleetGroup.propTypes = {

}

const mapStateToProps = (state) => {
	return {
		
	}
}

export default connect(
	mapStateToProps
)(FleetGroup)
