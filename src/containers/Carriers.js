import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Carriers extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const {  } = this.props
		
		return (
			<div>

			</div>
		)
	}
}

Carriers.propTypes = {

}

const mapStateToProps = (state) => {
	return {
		
	}
}

export default connect(
	mapStateToProps
)(Carriers)
