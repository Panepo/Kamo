import React, { Component, PropTypes } from 'react'
import Footer from './Footer'
import '../../css/Drawer.css'

export default class Drawer extends Component {
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

