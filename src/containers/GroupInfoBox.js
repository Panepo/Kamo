import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import { listAircraftType, listAircraftTypeN, listAircraftSkill } from '../constants/ConstList'
import { aircraftSkillChange, aircraftFactoryChange } from '../actions'

class GroupInfoBox extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { dbAircraftSelect, aircraftSkill, aircraftSkillChange, aircraftFactory, aircraftFactoryChange } = this.props
		
		var infoOut = []
		var infoTemp
		if ( dbAircraftSelect.length > 0 ) {
			infoTemp = <div key='info-name'>{dbAircraftSelect[0].name}</div>
			infoOut.push(infoTemp)
			
			for (var i=0; i<listAircraftType.length; i++){
				if ( dbAircraftSelect[0][listAircraftType[i]] > 0 ) {
					infoTemp = <label key={'info-'+listAircraftType[i]}>{listAircraftTypeN[i]}: {dbAircraftSelect[0][listAircraftType[i]]} </label>
					infoOut.push(infoTemp)
				}
			}
		}
		
		var buttTemp
		var buttOut = []
		for (var i=0; i<listAircraftSkill.length; i++){
			buttTemp = (
				<div key={"info-skill" + i.toString()} className="mdl-cell mdl-cell--1-col">
					<ToggleButton
						modelId={i.toString()}
						key={"info-skill" + i.toString()}
						display={aircraftSkill.toString()}
						onClickFunc={(modelId) => aircraftSkillChange(modelId)}
						Cactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
						Cinactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent"}
						title={listAircraftSkill[i]} />
				</div>
			)
			buttOut.push(buttTemp)
		}
		
		var factoryTemp
		var factoryOut = []
		for (var i=0; i<=10; i++){
			factoryTemp = (
				<div key={"info-factory" + i.toString()} className="mdl-cell mdl-cell--1-col">
					<ToggleButton
						modelId={i.toString()}
						key={"info-factory" + i.toString()}
						display={aircraftFactory.toString()}
						onClickFunc={(modelId) => aircraftFactoryChange(modelId)}
						Cactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
						Cinactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent"}
						title={"+" + i.toString()} />
				</div>
			)
			factoryOut.push(factoryTemp)
		}
		
		return (
			<div className="group-info group-unit mdl-shadow--4dp">
				<div className="group-info-up mdl-grid">
					<div className="mdl-cell mdl-cell--4-col">
						{infoOut}
					</div>
					{buttOut}
				</div>
				<div className="mdl-grid mdl-grid--no-spacing">
					<div className="mdl-cell mdl-cell--1-col" />
					{factoryOut}
				</div>
			</div>
		)
	}
}

GroupInfoBox.propTypes = {
	dbAircraftSelect: PropTypes.array.isRequired,
	aircraftSkill: PropTypes.string.isRequired,
	aircraftFactory: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		dbAircraftSelect: state.reducerGroup.dbAircraftSelect,
		aircraftSkill: state.reducerGroup.aircraftSkill,
		aircraftFactory: state.reducerGroup.aircraftFactory
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		aircraftSkillChange: bindActionCreators(aircraftSkillChange, dispatch),
		aircraftFactoryChange: bindActionCreators(aircraftFactoryChange, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupInfoBox)
