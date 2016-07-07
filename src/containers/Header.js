import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { modelOpen, modelClose } from '../actions'
import TextModel from '../components/TextModel'
import { listStatus, listStatusS } from '../constants/ConstList'
import '../../css/Header.css'

class Header extends Component {
	render() {
		const { modelStatus, modelOpen, modelClose, textOutput } = this.props
		
		return (
			<header className="mdl-layout__header">
				<TextModel
					display={modelStatus}
					input={textOutput} 
					modelClose={() => modelClose(0)} />
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">KAMO Lite</span>
					<div className="mdl-layout-spacer"></div>
					<nav className="mdl-navigation mdl-layout--large-screen-only">
						<a className="mdl-navigation__link" href="http://www.dmm.com/netgame_s/kancolle/">艦これ</a>
						<a className="mdl-navigation__link" href="http://wikiwiki.jp/kancolle/">攻略Wiki</a>
						<a className="mdl-navigation__link" onClick={() => modelOpen(0)}>掲示板張り付け用</a>
					</nav>
				</div>
			</header>
		)
	}
}

Header.propTypes = {
	modelStatus: PropTypes.bool.isRequired,
	textOutput: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		modelStatus: state.reducerPage.modelStatus,
		textOutput: state.reducerPage.textOutput
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		modelOpen: bindActionCreators(modelOpen, dispatch),
		modelClose: bindActionCreators(modelClose, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
