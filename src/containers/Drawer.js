import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from './Footer'
import ToggleSwitch from '../components/ToggleSwitch'
import { aircraftSkillDisplay } from '../actions'
import '../../css/Drawer.css'

class Drawer extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { aircraftSkillDisp, aircraftSkillDisplay } = this.props
		
		return (
			<div className="mdl-layout__drawer">
				<span className="mdl-layout-title">Config</span>
				<nav className="mdl-navigation">
					<ToggleSwitch
						key={"switch1"}
						classes={"nav-toggle"}
						modelId={"1"}
						display={aircraftSkillDisp.toString()}
						onClickFunc={(modelId) => aircraftSkillDisplay(modelId)}
						title={"艦載機熟練度表示"} />
				</nav>
				<Footer />
			</div>
		)
	}
}

Drawer.propTypes = {
	aircraftSkillDisp: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
	return {
		aircraftSkillDisp: state.dbStore.aircraftSkillDisp
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		aircraftSkillDisplay: bindActionCreators(aircraftSkillDisplay, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Drawer)
