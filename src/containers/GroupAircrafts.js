import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import ToggleImgButton from '../components/ToggleImgButton'
import { aircraftChange, aircraftTypeChange } from '../actions'
import { listAircraft, listAircraftS, listAircraftName } from '../constants/ConstList'
import '../../css/GroupAircrafts.css'

class GroupAircrafts extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { typeSelect, aircraftTypeChange, aircraftData, aircraftSelect, aircraftChange} = this.props
		
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listAircraft.length; i++){
			buttonTemp = (
				<ToggleImgButton
					key={"imgButton" + i.toString()}
					modelId={listAircraft[i]}
					display={typeSelect}
					onClickFunc={(modelId) => aircraftTypeChange(modelId)}
					Cactive={"img-button mdl-button--raised mdl-button--colored"}
					Cinactive={"img-button"}
					imgSrc={"./image/icon/" + listAircraftS[i] + ".png"}
					text={listAircraftName[i]}
					title={listAircraft[i]} />
			)
			buttonOut.push(buttonTemp)
			
			if ( typeSelect === listAircraft[i] ) {
				var tableTemp
				var tableOut = []
				for (var j=0; j<aircraftData.length; j++){
					tableTemp = (
						<ToggleButton
							modelId={aircraftData[j].id}
							key={"tableAircraft" + j.toString()}
							display={aircraftSelect}
							onClickFunc={(modelId) => aircraftChange(modelId)}
							Cactive={"aircraft-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised mdl-color--yellow-900"}
							Cinactive={"aircraft-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
							title={aircraftData[j].name} />
					)
					tableOut.push(tableTemp)
				}
				tableOut = <div className="scroll-menu" key={"scroll-menu" + i.toString()} >{tableOut}</div>
				buttonOut.push(tableOut)
			}
		}
		
		return (
			<div className="display-list mdl-cell mdl-cell--2-col mdl-shadow--4dp">
				{buttonOut}
			</div>
		)
	}
}

GroupAircrafts.propTypes = {
	typeSelect: PropTypes.string.isRequired,
	aircraftData: PropTypes.array.isRequired,
	aircraftSelect: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		typeSelect: state.reducerGroup.aircraftTypeSelect,
		aircraftData: state.reducerGroup.dbAircraftTypeQuery,
		aircraftSelect: state.reducerGroup.aircraftSelect
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
)(GroupAircrafts)
