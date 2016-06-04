import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import { listCarrierThead, listCarrierTbody } from '../constants/ConstList'
import '../../css/Group.css'

class Group extends Component {
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
		var imgSrcTemp = ''
		var idTemp = ''
		for (var i=0; i<selectData.length; i++){
			tdOut = []
			for (var j=0; j<listCarrierTbody.length; j++){
				stringTemp = 'tbodyGroup' + i.toString() + j.toString()
				if ( j === 0 ) {
					imgSrcTemp = 'image/ship/' + selectData[i][listCarrierTbody[j]] + '.jpg'
					tdTemp = (
						<td key={stringTemp}>
							<img src={imgSrcTemp} />
						</td>
						)
				} else {
					idTemp = selectData[i].id + listCarrierTbody[j]
					tdTemp = (
						<td key={stringTemp}>
							<ToggleButton
								modelId={idTemp}
								key={"tdGroup" + i.toString()}
								display={"0"}
								onClickFunc={(modelId) => carrierSortChange(modelId)}
								Cactive={"group-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
								Cinactive={"group-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
								title={ selectData[i][listCarrierTbody[j]].toString() } />
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
			<div className="mdl-cell mdl-cell--7-col">
				<table className="group-table mdl-data-table mdl-js-data-table mdl-shadow--4dp">
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
		selectData: state.dataCarrier.dbSelect
	}
}

export default connect(
	mapStateToProps
)(Group)
