import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GroupInfoBox from './GroupInfoBox'
import ToggleButton from '../components/ToggleButton'
import ToggleImgButton from '../components/ToggleImgButton'
import { carrierSelect, carrierSlotSelect } from '../actions'
import { listCarrierThead, listCarrierTbody, listCarrierTbodyText, listAircraft, listAircraftColor, listAircraftSkill, listAircraftSkill2} from '../constants/ConstList'
import '../../css/GroupMember.css'

class GroupMember extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { selectData, carrierSelect, carrierSlotSelect, airControl, aircraftCount, scout, scout0, scout1, scout2, scout3, airDamage } = this.props
		
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
			for (var j=0; j<listCarrierTbody.length+1; j++){
				stringTemp = 'tbodyGroup' + i.toString() + j.toString()
				if ( j === 0 ) {
					var imgSrcTemp = 'image/ship/' + selectData[i].id + '.jpg'
					tdTemp = (
						<td key={stringTemp}>
							<div>
								<ToggleImgButton
									key={"groupButton" + i.toString()}
									modelId={selectData[i].id}
									display={'0'}
									onClickFunc={(modelId) => carrierSelect(modelId)}
									Cactive={"mdl-button--raised mdl-button--colored"}
									Cinactive={""}
									imgSrc={imgSrcTemp}
									text={""}
									title={selectData[i].name} />
							</div>
							<div className="thead">火力: {selectData[i]["firepowerEQ"]}</div>
						</td>
						)
				} else {
					if ( selectData[i][listCarrierTbody[j]] > 0 ) {
						var textTemp = ''
						var idTemp = listCarrierTbody[j] + selectData[i].id
						var slotID = listCarrierTbody[j] + 'id'
						var slotName = listCarrierTbody[j] + 'short'
						var slotType = listCarrierTbody[j] + 'type'
						var slotFac = listCarrierTbody[j] + 'fac'
						var classTemp = "group-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
						
						if ( selectData[i][slotID] ) {
							textTemp = "+" + selectData[i][slotFac] + selectData[i][slotName] + "(" + selectData[i][listCarrierTbody[j]].toString() + ")" + listAircraftSkill2[selectData[i][listCarrierTbody[j] + 'skill']]
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
							
						} else {
							textTemp = selectData[i][listCarrierTbodyText[j]].toString()
						}
						
						tdTemp = (
							<td key={stringTemp}>
								<ToggleButton
									modelId={idTemp}
									key={"tdGroup" + i.toString()}
									display={"0"}
									onClickFunc={(modelId) => carrierSlotSelect(modelId)}
									Cactive={"group-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
									Cinactive={classTemp}
									title={textTemp} />
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
			<div className="display-area mdl-cell mdl-cell--8-col">
				<GroupInfoBox />
				<div className="group-unit mdl-shadow--4dp mdl-grid">
					<div className="mdl-cell mdl-cell--2-col">艦載機総數: {aircraftCount}</div>
					<div className="mdl-cell mdl-cell--2-col">艦隊総制空力: {airControl}</div>
					<div className="mdl-cell mdl-cell--4-col">触接開始率: {scout}%(確保) {Math.floor(scout*0.6)}%(優勢)</div>
					<div className="mdl-cell mdl-cell--2-col">触接率: {scout3}/{scout2}/{scout1 + scout0}%</div>
					<div className="mdl-cell mdl-cell--2-col">期望觸接倍率: {airDamage}%</div>
				</div>
				<div className="group-unit group-table group-table-div mdl-shadow--4dp">
					<table className="group-table mdl-data-table mdl-js-data-table">
						{theadOut}
						{tbodyOut}
					</table>
				</div>
			</div>
		)
	}
}

GroupMember.propTypes = {
	selectData: PropTypes.array.isRequired,
	airControl: PropTypes.number.isRequired,
	scout: PropTypes.number.isRequired,
	scout0: PropTypes.number.isRequired,
	scout1: PropTypes.number.isRequired,
	scout2: PropTypes.number.isRequired,
	scout3: PropTypes.number.isRequired,
	airDamage: PropTypes.number.isRequired,
	aircraftCount: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
	return {
		selectData: state.reducerGroup.dbCarrierSelect,
		airControl: state.reducerGroup.airControl,
		scout: state.reducerGroup.scout,
		scout0: state.reducerGroup.scout0,
		scout1: state.reducerGroup.scout1,
		scout2: state.reducerGroup.scout2,
		scout3: state.reducerGroup.scout3,
		airDamage: state.reducerGroup.airDamage,
		aircraftCount: state.reducerGroup.aircraftCount
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		carrierSelect: bindActionCreators(carrierSelect, dispatch),
		carrierSlotSelect: bindActionCreators(carrierSlotSelect, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupMember)
