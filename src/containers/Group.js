import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import ToggleImgButton from '../components/ToggleImgButton'
import { carrierSelect, carrierSlotSelect } from '../actions'
import { listCarrierThead, listCarrierTbody, listAircraft } from '../constants/ConstList'
import '../../css/Group.css'

class Group extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { selectData, carrierSelect, carrierSlotSelect } = this.props
		
		var theadTemp
		var theadOut = []
		var stringTemp = ''
		for (var i=0; i<listCarrierThead.length; i++){
			stringTemp = 'theadGroup' + i.toString()
			theadTemp = (
				<th key={stringTemp}>
					{listCarrierThead[i]}
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
							<ToggleImgButton
								key={"groupButton" + i.toString()}
								modelId={selectData[i].id}
								display={'0'}
								onClickFunc={(modelId) => carrierSelect(modelId)}
								Cactive={"mdl-button--raised mdl-button--colored"}
								Cinactive={""}
								imgSrc={imgSrcTemp}
								title={selectData[i].name} />
						</td>
						)
				} else {
					var textTemp = ''
					var idTemp = listCarrierTbody[j] + selectData[i].id
					var slotID = listCarrierTbody[j] + 'id'
					var slotName = listCarrierTbody[j] + 'name'
					var slotType = listCarrierTbody[j] + 'type'
					var classTemp = "group-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
					
					if ( selectData[i][slotID] ) {
						textTemp = selectData[i][slotName]
						
						switch ( selectData[i][slotType] ) {
							case listAircraft[0]:
								classTemp = classTemp + " mdl-color--green-900 mdl-button--raised"
								break;
							case listAircraft[1]:
								classTemp = classTemp + " mdl-color--red-900 mdl-button--raised"
								break;
							case listAircraft[2]:
								classTemp = classTemp + " mdl-color--blue-900 mdl-button--raised"
								break;
							case listAircraft[3]:
								classTemp = classTemp + " mdl-color--yellow-900 mdl-button--raised"
								break;
							case listAircraft[4]:
								classTemp = classTemp + " mdl-color--green-400 mdl-button--raised"
								break;
							case listAircraft[5]:
								classTemp = classTemp + " mdl-color--green-400 mdl-button--raised"
								break;
							case listAircraft[6]:
								classTemp = classTemp + " mdl-color--green-400 mdl-button--raised"
								break;
							case listAircraft[7]:
								classTemp = classTemp + " mdl-color--blue-400 mdl-button--raised"
								break;
							case listAircraft[8]:
								classTemp = classTemp + " mdl-color--green-400 mdl-button--raised"
								break;
						}
						
					} else {
						textTemp = selectData[i][listCarrierTbody[j]].toString()
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
				}
				tdOut.push(tdTemp)
			}
			stringTemp = 'trGroup' + i.toString()
			tdOut = <tr key={stringTemp}>{tdOut}</tr>
			tbodyOut.push(tdOut)
		}
		tbodyOut = <tbody>{tbodyOut}</tbody>

		return (
			<div className="mdl-cell mdl-cell--7-col mdl-shadow--4dp">
				<table className="group-table mdl-data-table mdl-js-data-table">
					{theadOut}
					{tbodyOut}
				</table>
			</div>
		)
	}
}

Group.propTypes = {
	selectData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		selectData: state.dbStore.dbCarrierSelect
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
)(Group)