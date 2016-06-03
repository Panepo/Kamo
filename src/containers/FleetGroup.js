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
					<div className="mdl-cell mdl-cell--3-col">
						<Aircrafts />
					</div>
					<div className="mdl-cell mdl-cell--9-col">
						<Carriers />
					</div>
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
