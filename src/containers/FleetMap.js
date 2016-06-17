import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class FleetMap extends Component {
	render() {
		const {  } = this.props
		
		return (
			<div className="page-content">
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--4dp">Under</div>
					<div className="mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--4dp">Construction</div>
				</div>
			</div>
		)
	}
}

FleetMap.propTypes = {

}

const mapStateToProps = (state) => {
	return {
		
	}
}

export default connect(
	mapStateToProps
)(FleetMap)