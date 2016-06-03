import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import ToggleImgButton from '../components/ToggleImgButton'
import { aircraftTypeChange, aircraftChange } from '../actions'
import { listAircraft, listAircraftS } from '../constants/ConstList'
import '../../css/Aircrafts.css'

class Aircrafts extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { typeSelect, aircraftTypeChange, aircraftData, aircraftSelect, aircraftChange } = this.props
		
		var stringTemp = ''
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listAircraft.length; i++){
			stringTemp = "./image/icon/" + listAircraftS[i]
			buttonTemp = (
				<ToggleImgButton
					key={"imgButton" + i.toString()}
					modelId={listAircraft[i]}
					display={typeSelect}
					onClickFunc={(modelId) => aircraftTypeChange(modelId)}
					Cactive={"img-button img-active"}
					Cinactive={"img-button img-inactive"}
					imgSrc={stringTemp}
					title={listAircraft[i]} />
			)
			buttonOut.push(buttonTemp)
		}
		
		var tableTemp
		var tableOut = []
		for (var i=0; i<aircraftData.length; i++){
			tableTemp = (
				<ToggleButton
					modelId={aircraftData[i].id}
					key={"tableAircraft" + i.toString()}
					display={aircraftSelect}
					onClickFunc={(modelId) => aircraftChange(modelId)}
					Cactive={"aircraft-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
					Cinactive={"aircraft-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
					title={aircraftData[i].name} />
			)
			tableOut.push(tableTemp)
		}
		
		return (
			<div>
				<div className="button-table mdl-shadow--4dp">
					{buttonOut}
				</div>
				<div className="aircraft-table mdl-shadow--4dp">
					{tableOut}
				</div>
			</div>
		)
	}
}

Aircrafts.propTypes = {
	typeSelect: PropTypes.string.isRequired,
	aircraftData: PropTypes.array.isRequired,
	aircraftSelect: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		typeSelect: state.dataAircraft.typeSelect,
		aircraftData: state.dataAircraft.output,
		aircraftSelect: state.dataAircraft.aircraftSelect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		aircraftTypeChange: bindActionCreators(aircraftTypeChange, dispatch),
		aircraftChange: bindActionCreators(aircraftChange, dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Aircrafts)
