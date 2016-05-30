import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Footer from './Footer'
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
				<Footer />
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
