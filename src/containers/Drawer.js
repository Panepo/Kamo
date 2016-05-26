import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import '../../css/Content.css'

class Drawer extends Component {
	render() {
		const {  } = this.props
		
		return (
			<div className="mdl-layout__drawer">
				<span className="mdl-layout-title">Title</span>
				<nav className="mdl-navigation">
					<a className="mdl-navigation__link" href="">Link</a>
					<a className="mdl-navigation__link" href="">Link</a>
					<a className="mdl-navigation__link" href="">Link</a>
					<a className="mdl-navigation__link" href="">Link</a>
				</nav>
			</div>
		)
	}
}

Drawer.propTypes = {
	
}

const mapStateToProps = (state) => {
	return {
		
	}
}

export default connect(
	mapStateToProps
)(Drawer)
