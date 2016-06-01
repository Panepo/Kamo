import React, { Component, PropTypes } from 'react'

export default class ListAircraft extends Component {
	render() {
		const { data, onClickFunc } = this.props
		
		var dataTemp
		var dataOut = []
		var stringTemp = ""
		for (var i=0; i<data.length; i++){
			stringTemp = 'dataCheckbox' + i
			dataTemp = (
				<tr>
					<td>
						<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={stringTemp}>
							<input type="checkbox" id={stringTemp} className="mdl-checkbox__input" />
						</label>
					</td>
					<td className="mdl-data-table__cell--non-numeric">{data[i].name}</td>
				</tr>
				)
			dataOut.push(dataTemp)
		}
		
		return (
			<div>
				<table className="aircraft-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
					<tbody>
						{dataOut}
					</tbody>
				</table>
			</div>
		)
	}
}

ListAircraft.propTypes = {
	display: PropTypes.array,
	onClickFunc: PropTypes.func
}
