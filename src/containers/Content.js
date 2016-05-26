import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import '../../css/Content.css'

class Content extends Component {
	render() {
		const {  } = this.props
		
		return (
			<main className="mdl-layout__content">
				<div className="page-content">Content</div>
			</main>
		)
	}
}

Content.propTypes = {
	
}

const mapStateToProps = (state) => {
	return {
		
	}
}

export default connect(
	mapStateToProps
)(Content)
