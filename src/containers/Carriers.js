import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import { carrierSortChange } from '../actions'
import { listCarrierThead, listCarrierTbody } from '../constants/ConstList'
import '../../css/Carriers.css'

class Carriers extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { carrierData, carrierSort, carrierSortChange } = this.props
		
		var theadTemp
		var theadOut = []
		var stringTemp = ''
		for (var i=0; i<listCarrierThead.length; i++){
			stringTemp = 'thead' + i.toString()
			theadTemp = (
				<th key={stringTemp} >
					<ToggleButton
						modelId={listCarrierTbody[i]}
						key={"thCarrier" + i.toString()}
						display={carrierSort}
						onClickFunc={(modelId) => carrierSortChange(modelId)}
						Cactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
						Cinactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
						title={listCarrierThead[i]} />
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
		for (var i=0; i<carrierData.length; i++){
			tdOut = []
			for (var j=0; j<listCarrierTbody.length; j++){
				stringTemp = 'tbody' + i.toString() + j.toString()
				if ( j === 0 ) {
					imgSrcTemp = 'image/ship/' + carrierData[i][listCarrierTbody[j]] + '.jpg'
					tdTemp = (
						<td key={stringTemp}>
							<img src={imgSrcTemp} />
						</td>
						)
				} else {
					idTemp = carrierData[i].id + listCarrierTbody[j]
					tdTemp = (
						<td key={stringTemp}>
							<ToggleButton
								modelId={idTemp}
								key={"tdCarrier" + i.toString()}
								display={"0"}
								onClickFunc={(modelId) => carrierSortChange(modelId)}
								Cactive={"carrier-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
								Cinactive={"carrier-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
								title={ carrierData[i][listCarrierTbody[j]].toString() } />
						</td>
						)
				}
				tdOut.push(tdTemp)
			}
			stringTemp = 'tr' + i.toString()
			tdOut = <tr key={stringTemp}>{tdOut}</tr>
			tbodyOut.push(tdOut)
		}
		tbodyOut = <tbody>{tbodyOut}</tbody>
		
		return (
			<table className="carrier-table mdl-data-table mdl-js-data-table mdl-shadow--4dp">
				{theadOut}
				{tbodyOut}
			</table>
		)
	}
}

Carriers.propTypes = {
	carrierData: PropTypes.array.isRequired,
	carrierSort: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		carrierData: state.dataCarrier.output,
		carrierSort: state.dataCarrier.sort
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		carrierSortChange: bindActionCreators(carrierSortChange, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Carriers)
