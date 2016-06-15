import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {  } from '../actions'
import { listCarrierThead, listCarrierTbody, listAircraft, listAircraftColor, listAircraftSkill2 } from '../constants/ConstList'
import { calcSlotAircontrol } from '../reducers/dbStore'

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
		
		var tdTemp
		var tdOut = []
		var tbodyOut = []
		for (var i=0; i<selectData.length; i++){
			tdOut = []
			for (var j=0; j<listCarrierTbody.length; j++){
				stringTemp = 'tbodyGroup' + i.toString() + j.toString()
				if ( j === 0 ) {
					var imgSrcTemp = 'image/ship/' + selectData[i].id + '.jpg'
					tdTemp = (
						<td key={stringTemp}>
							<img src={imgSrcTemp} alt={selectData[i].name} />
						</td>
						)
				} else {
					if ( selectData[i][listCarrierTbody[j]] > 0 ) {
						var textTemp = ''
						var textTemp2 = ''
						var idTemp = listCarrierTbody[j] + selectData[i].id
						var slotID = listCarrierTbody[j] + 'id'
						var slotName = listCarrierTbody[j] + 'short'
						var slotType = listCarrierTbody[j] + 'type'
						var classTemp = "group-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
						
						if ( selectData[i][slotID] ) {
							textTemp = selectData[i][slotName] + "(" + selectData[i][listCarrierTbody[j]].toString() + ") " + listAircraftSkill2[selectData[i][listCarrierTbody[j] + 'skill']]
							switch ( selectData[i][slotType] ) {
								case listAircraft[0]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[0] + " mdl-button--raised"
									break;
								case listAircraft[1]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[1] + " mdl-button--raised"
									break;
								case listAircraft[2]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[2] + " mdl-button--raised"
									break;
								case listAircraft[3]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[3] + " mdl-button--raised"
									break;
								case listAircraft[4]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[4] + " mdl-button--raised"
									break;
								case listAircraft[5]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[5] + " mdl-button--raised"
									break;
								case listAircraft[6]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[6] + " mdl-button--raised"
									break;
								case listAircraft[7]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[7] + " mdl-button--raised"
									break;
								case listAircraft[8]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[8] + " mdl-button--raised"
									break;
								case listAircraft[9]:
									classTemp = classTemp + " mdl-color--" + listAircraftColor[9] + " mdl-button--raised"
									break;
							}
						}
						
						tdTemp = (
							<td key={stringTemp}>
								<div className={classTemp}>{textTemp}</div>
							</td>
							)
						
					} else {
						tdTemp = <td key={stringTemp}></td>
					}
				}
				tdOut.push(tdTemp)
			}
			stringTemp = 'trGroup' + i.toString()
			tdOut = <tr key={stringTemp}>{tdOut}</tr>
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