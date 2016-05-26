import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { statusChange } from '../actions'
import ToggleButton from '../components/ToggleButton'
import { listStatus, listStatusS } from '../constants/ConstList'
//import { CbuttonActive, CbuttonInactive } from '../constants/ConstClassname'
//import '../../css/Header.css'

class Header extends Component {
	render() {
		const { dispStatus, statusChange } = this.props
		
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listStatus.length; i++){
			buttonTemp = (
				<ToggleButton
					key={"statusButton" + i.toString()}
					modelId={listStatusS[i]}
					display={dispStatus}
					onClickFunc={(modelId) => statusChange(modelId)}
					Cactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised"}
					Cinactive={"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent"}
					title={listStatus[i]} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<header className="mdl-layout__header">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">Title</span>
					<div className="mdl-layout-spacer"></div>
					<nav className="mdl-navigation mdl-layout--large-screen-only">
						{buttonOut}
					</nav>
				</div>
			</header>
		)
	}
}

Header.propTypes = {
	dispStatus: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		dispStatus: state.dispStatus.status
	}
}

export default connect(
	mapStateToProps,
	{ statusChange }
)(Header)
