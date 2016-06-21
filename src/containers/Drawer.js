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
				<span className="mdl-layout-title">Licence</span>
				<nav className="mdl-navigation">
					<a className="mdl-navigation__link" href="http://www.dmm.com/netgame_s/kancolle/">艦これ</a>
					<a className="mdl-navigation__link" href="https://facebook.github.io/react/">React</a>
					<a className="mdl-navigation__link" href="http://redux.js.org/">Redux</a>
					<a className="mdl-navigation__link" href="https://d3js.org/">D3</a>
					<a className="mdl-navigation__link" href="https://getmdl.io/">Material Design Lite</a>
					<a className="mdl-navigation__link" href="http://lokijs.org/">LokiJS</a>
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
