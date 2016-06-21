import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { listStautTheadAir, listStautTheadFP, listStautTheadAS, searchSlot } from '../constants/ConstList'

class StatusInfo extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { status, outputInfo } = this.props

		var listStautThead = []
		
		switch (status) {
			case "air":
				listStautThead = listStautTheadAir
				break
			case "firepower":
			case "sonar":
				listStautThead = listStautTheadFP
				break
			case "airstrike":
				listStautThead = listStautTheadAS
		}
		
		var theadTemp
		var theadOut = []
		for (var i=0; i<listStautThead.length; i++){
			if ( i === 0 ) {
				theadTemp = (
					<th key={'theadStatus' + i.toString()}>
						<div className="thead">
							{listStautThead[i]}
						</div>
					</th>
				)
			} else {
			theadTemp = (
				<th key={'theadStatus' + i.toString()}>
					{listStautThead[i]}
				</th>
				)
			}
			theadOut.push(theadTemp)
		}
		theadOut = <thead><tr>{theadOut}</tr></thead>
		
		var tdTemp
		var tdOut = []
		var tbodyOut = []
		for (var i=0; i<outputInfo.length; i++){
			var tdOut = []
			
			for (var j=0; j<(searchSlot.length+2); j++){
				if ( j === 0 ) {
					tdTemp = <td key={'tdStatus' + i.toString() + j.toString()}><img src={outputInfo[i].imgsrc} /></td>
				} else if ( j === 1 ) {
					tdTemp = <td key={'tdStatus' + i.toString() + j.toString()}>{outputInfo[i]["total"]}</td>
				} else {
					if ( outputInfo[i][searchSlot[j-2]] ) {
						tdTemp = <td key={'tdStatus' + i.toString() + j.toString()}>{outputInfo[i][searchSlot[j-2]]}</td>
					} else {
						tdTemp = <td key={'tdStatus' + i.toString() + j.toString()}>-</td>
					}
				}
				tdOut.push(tdTemp)
			}
			tdOut = <tr key={'tbodyStatus' + i.toString()}>{tdOut}</tr>
			tbodyOut.push(tdOut)
		}
		tbodyOut = <tbody>{tbodyOut}</tbody>
		
		return (
			<table className="status-info mdl-data-table mdl-js-data-table mdl-shadow--4dp">
				{theadOut}
				{tbodyOut}
			</table>
		)
	}
}

StatusInfo.propTypes = {
	status: PropTypes.string.isRequired,
	outputInfo: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		status: state.reducerStatus.status,
		outputInfo: state.reducerStatus.outputInfo
	}
}

export default connect(
	mapStateToProps
)(StatusInfo)