import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pageChange } from '../actions'
import ToggleButton from '../components/ToggleButton'
import { listStatus, listStatusS } from '../constants/ConstList'

class Header extends Component {
	render() {
		const { dispStatus, pageChange } = this.props
		
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<listStatus.length; i++){
			buttonTemp = (
				<ToggleButton
					key={"statusButton" + i.toString()}
					modelId={listStatusS[i]}
					display={dispStatus}
					onClickFunc={(modelId) => pageChange(modelId)}
					Cactive={"mdl-layout__tab is-active"}
					Cinactive={"mdl-layout__tab"}
					title={listStatus[i]} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<header className="mdl-layout__header">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">KAMO</span>
					<div className="mdl-layout-spacer"></div>
					<nav className="mdl-navigation mdl-layout--large-screen-only">
						<a className="mdl-navigation__link" href="">Link</a>
						<a className="mdl-navigation__link" href="">Link</a>
						<a className="mdl-navigation__link" href="">Link</a>
						<a className="mdl-navigation__link" href="">Link</a>
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
	dispStatus: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		dispStatus: state.dispStatus.status
	}
}

export default connect(
	mapStateToProps,
	{ pageChange }
)(Header)
