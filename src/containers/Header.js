import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pageChange, modelOpen, modelClose } from '../actions'
import ToggleButton from '../components/ToggleButton'
import TextModel from '../components/TextModel'
import { listStatus, listStatusS } from '../constants/ConstList'
import '../../css/Header.css'

class Header extends Component {
	render() {
		const { pageStatus, pageChange, modelStatus, modelOpen, modelClose, textOutput } = this.props
		
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listStatus.length; i++){
			buttonTemp = (
				<ToggleButton
					key={"statusButton" + i.toString()}
					modelId={listStatusS[i]}
					display={pageStatus}
					onClickFunc={(modelId) => pageChange(modelId)}
					Cactive={"mdl-layout__tab is-active"}
					Cinactive={"mdl-layout__tab"}
					title={listStatus[i]} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<header className="mdl-layout__header">
				<TextModel
					display={modelStatus}
					input={textOutput} 
					modelClose={() => modelClose(0)} />
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">KAMO</span>
					<div className="mdl-layout-spacer"></div>
					<nav className="mdl-navigation mdl-layout--large-screen-only">
						<a className="mdl-navigation__link" href="http://www.dmm.com/netgame_s/kancolle/">艦これ</a>
						<a className="mdl-navigation__link" href="http://wikiwiki.jp/kancolle/">攻略Wiki</a>
						<a className="mdl-navigation__link" onClick={() => modelOpen(0)}>掲示板張り付け用</a>
					</nav>
				</div>
				<div className="mdl-layout__tab-bar mdl-js-ripple-effect">
					{buttonOut}
				</div>
			</header>
		)
	}
}

Header.propTypes = {
	pageStatus: PropTypes.string.isRequired,
	modelStatus: PropTypes.bool.isRequired,
	textOutput: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		pageStatus: state.reducerPage.status,
		modelStatus: state.reducerPage.modelStatus,
		textOutput: state.reducerPage.textOutput
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		pageChange: bindActionCreators(pageChange, dispatch),
		modelOpen: bindActionCreators(modelOpen, dispatch),
		modelClose: bindActionCreators(modelClose, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
