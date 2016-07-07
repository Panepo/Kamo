import React, { Component, PropTypes } from 'react'
import FleetGroup from './FleetGroup'
import { listStatusS } from '../constants/ConstList'
import '../../css/Content.css'

export default class Content extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		return (
			<main className="content mdl-layout__content">
				<div className={listStatusS[0] + " display-area"}>
					<FleetGroup />
				</div>
			</main>
		)
	}
}