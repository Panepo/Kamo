import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PieChart } from 'react-d3';
import {  } from '../actions'
import {  } from '../constants/ConstList'

class StatusD3 extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { status, output, airControl } = this.props
		
		var d3Output
		switch (status) {
			case "air":
				d3Output = (
					<PieChart
						data={output}
						width={400}
						height={400}
						radius={100}
						innerRadius={20}
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
		output: state.statusStore.output
	}
}

export default connect(
	mapStateToProps
)(StatusD3)