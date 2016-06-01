import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ToggleImgButton from '../components/ToggleImgButton'
import ListAircraft from '../components/ListAircraft'

import { typeChange } from '../actions'
import { listAircraft, listAircraftS } from '../constants/ConstList'
import '../../css/Aircrafts.css'

class Aircrafts extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { typeSelect, typeChange, data } = this.props
		
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listAircraft.length; i++){
			buttonTemp = (
				<ToggleImgButton
					key={"imgButton" + i.toString()}
					modelId={listAircraft[i]}
					display={typeSelect}
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
				<div className="button-table mdl-shadow--2dp">
					{buttonOut}
				</div>
				<div>
					<ListAircraft
						data={data}
						onClickFunc={(modelId) => typeChange(modelId)}
						/>
				</div>
			</div>
		)
	}
}

Aircrafts.propTypes = {
	typeSelect: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		typeSelect: state.dataAircraft.typeSelect,
		data: state.dataAircraft.output
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		typeChange: bindActionCreators(typeChange, dispatch)

	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Aircrafts)
