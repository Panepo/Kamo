import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ToggleImgButton from '../components/ToggleImgButton'

import { typeChange } from '../actions'
import { listAircraft, listAircraftS } from '../constants/ConstList'
import '../../css/Aircrafts.css'

class Aircrafts extends Component {
	render() {
		const { typeStatus, typeChange } = this.props
		
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listAircraft.length; i++){
			buttonTemp = (
				<ToggleImgButton
					key={"imgButton" + i.toString()}
					modelId={listAircraft[i]}
					display={typeStatus}
					onClickFunc={(modelId) => typeChange(modelId)}
					Cactive={"img-button img-active"}
					Cinactive={"img-button img-inactive"}
					imgSrc={listAircraftS[i]}
					title={listAircraft[i]} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<div>
				{buttonOut}
			</div>
		)
	}
}

Aircrafts.propTypes = {
	typeStatus: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		typeStatus: state.typeStatus.status
	}
}

/*const mapDispatchToProps = (dispatch) => {
	return {
		typeChange: bindActionCreators(typeChange, dispatch)

	}
}*/


export default connect(
	mapStateToProps,
	{ typeChange }
)(Aircrafts)
