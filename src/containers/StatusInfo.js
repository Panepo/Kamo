import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {  } from '../actions'
import { listCarrierThead } from '../constants/ConstList'

class StatusInfo extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { selectData } = this.props

		var theadTemp
		var theadOut = []
		var stringTemp = ''
		for (var i=0; i<listCarrierThead.length; i++){
			stringTemp = 'theadGroup' + i.toString()
			theadTemp = (
				<th className={stringTemp} key={stringTemp}>
					<div className="thead">
						{listCarrierThead[i]}
					</div>
				</th>
				)
			theadOut.push(theadTemp)
		}
		theadOut = <thead><tr>{theadOut}</tr></thead>
		
		return (
			<table className="status-info mdl-data-table mdl-js-data-table mdl-shadow--4dp">
				{theadOut}
			</table>
		)
	}
}

StatusInfo.propTypes = {
	selectData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		selectData: state.dbStore.dbCarrierSelect
	}
}

export default connect(
	mapStateToProps
)(StatusInfo)