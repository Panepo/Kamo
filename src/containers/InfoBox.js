import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import { listAircraftType, listAircraftTypeN, listAircraftSkill } from '../constants/ConstList'
import { aircraftSkillChange } from '../actions'

class InfoBox extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { dbAircraftSelect, aircraftSkill, aircraftSkillDisp, aircraftSkillChange } = this.props
		
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
		if ( aircraftSkillDisp ) {
			for (var i=0; i<listAircraftSkill.length; i++){
				buttTemp = (
					<div className="mdl-cell mdl-cell--1-col">
						<ToggleButton
							modelId={i}
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
		}


		return (
			<div className="mdl-shadow--4dp">
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--4-col">
						{infoOut}
					</div>
					{buttOut}
				</div>
			</div>
		)
	}
}

InfoBox.propTypes = {
	dbAircraftSelect: PropTypes.array.isRequired,
	aircraftSkillDisp: PropTypes.number.isRequired,
	aircraftSkill: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
	return {
		dbAircraftSelect: state.dbStore.dbAircraftSelect,
		aircraftSkillDisp: state.dbStore.aircraftSkillDisp,
		aircraftSkill: state.dbStore.aircraftSkill
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		aircraftSkillChange: bindActionCreators(aircraftSkillChange, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfoBox)
