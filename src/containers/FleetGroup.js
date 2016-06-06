import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Aircrafts from './Aircrafts'
import Carriers from './Carriers'
import Group from './Group'

class FleetGroup extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const {  } = this.props
		
		return (
			<div className="page-content">
				<div className="mdl-grid">
					<Aircrafts />
					<Carriers />
					<Group />
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
