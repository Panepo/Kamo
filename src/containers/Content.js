import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FleetGroup from './FleetGroup'
import FleetStatus from './FleetStatus'
import FleetMap from './FleetMap'
import { listStatus, listStatusS } from '../constants/ConstList'
import '../../css/Content.css'

class Content extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { dispStatus } = this.props
		
		var dispTemp
		switch ( dispStatus ) {
			case listStatusS[0]:
				dispTemp = 
					<div className={listStatusS[0]}>
						<FleetGroup />
					</div>
				break
			case listStatusS[1]:
				dispTemp = 
					<div className={listStatusS[1]}>
						<FleetStatus />
					</div>
				break
			case listStatusS[2]:
				dispTemp = 
					<div className={listStatusS[2]}>
						<FleetMap />
					</div>
				break
			default:
				dispTemp = <div className={dispStatus}>{dispStatus}</div>
		}
		
		
		return (
			<main className="content mdl-layout__content">
				{dispTemp}
			</main>
		)
	}
}

Content.propTypes = {
	dispStatus: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		dispStatus: state.dispStatus.status
	}
}

export default connect(
	mapStateToProps
)(Content)
