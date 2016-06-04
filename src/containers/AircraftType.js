import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleImgButton from '../components/ToggleImgButton'
import { aircraftTypeChange } from '../actions'
import { listAircraft, listAircraftS } from '../constants/ConstList'
import '../../css/Aircrafts.css'

class AircraftType extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { typeSelect, aircraftTypeChange} = this.props
		
		var stringTemp = ''
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listAircraft.length; i++){
			stringTemp = "./image/icon/" + listAircraftS[i] + ".png"
			buttonTemp = (
				<ToggleImgButton
					key={"imgButton" + i.toString()}
					modelId={listAircraft[i]}
					display={typeSelect}
					onClickFunc={(modelId) => aircraftTypeChange(modelId)}
					Cactive={"img-button mdl-button--raised mdl-button--colored"}
					Cinactive={"img-button"}
					imgSrc={stringTemp}
					title={listAircraft[i]} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<div className="overflow-list mdl-cell mdl-cell--1-col mdl-shadow--4dp">
				{buttonOut}
			</div>
		)
	}
}

AircraftType.propTypes = {
	typeSelect: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		typeSelect: state.dataAircraft.typeSelect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		aircraftTypeChange: bindActionCreators(aircraftTypeChange, dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AircraftType)
