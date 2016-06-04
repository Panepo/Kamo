import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import { aircraftChange } from '../actions'
import '../../css/Aircrafts.css'

class Aircrafts extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { aircraftData, aircraftSelect, aircraftChange } = this.props
		
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
			<div className="overflow-list mdl-cell mdl-cell--2-col mdl-shadow--4dp">
				{tableOut}
			</div>
		)
	}
}

Aircrafts.propTypes = {
	aircraftData: PropTypes.array.isRequired,
	aircraftSelect: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		aircraftData: state.dbStore.dbAircraftTypeQuery,
		aircraftSelect: state.dbStore.aircraftSelect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		aircraftChange: bindActionCreators(aircraftChange, dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Aircrafts)
