import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import '../../css/Header.css'

class Header extends Component {
	render() {
		const {  } = this.props
		
		return (
			<header>
			</header>
		)
	}
}

Header.propTypes = {

}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
