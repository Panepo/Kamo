import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PieChart } from 'rd3';
import {  } from '../actions'
import {  } from '../constants/ConstList'

class StatusD3 extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { status, outputD3, airControl } = this.props
		
		var d3Output
		switch (status) {
			case "air":
				d3Output = (
					<PieChart
						data={outputD3}
						width={600}
						height={450}
						radius={150}
						innerRadius={30}
						sectorBorderColor="white"
						title={"総制空力: " + airControl.toString()}
					/>
				)
				break
		}
		
		return (
			<div className="status-d3output">
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--12-col">
						{d3Output}
					</div>
				</div>
			</div>
		)
	}
}

StatusD3.propTypes = {
	airControl: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		airControl: state.dbStore.airControl,
		status: state.statusStore.status,
		outputD3: state.statusStore.outputD3
	}
}

export default connect(
	mapStateToProps
)(StatusD3)