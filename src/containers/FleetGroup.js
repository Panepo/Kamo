import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Aircrafts from './Aircrafts'
import Carriers from './Carriers'
import Group from './Group'

export default class FleetGroup extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		return (
			<div className="page-content display-area">
				<div className="mdl-grid display-area">
					<Aircrafts />
					<Carriers />
					<Group />
				</div>
			</div>
		)
	}
}