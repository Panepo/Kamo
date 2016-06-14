import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GroupAircrafts from './GroupAircrafts'
import GroupCarriers from './GroupCarriers'
import GroupMember from './GroupMember'

export default class FleetGroup extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		return (
			<div className="page-content display-area">
				<div className="mdl-grid display-area">
					<GroupAircrafts />
					<GroupCarriers />
					<GroupMember />
				</div>
			</div>
		)
	}
}