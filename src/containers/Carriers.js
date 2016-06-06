import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleImgButton from '../components/ToggleImgButton'
import { carrierSelect } from '../actions'
import '../../css/Carriers.css'

class Carriers extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { carrierData, carrierSelect, selectData } = this.props
		
		var stringTemp = ''
		var idTemp = ''
		var buttonTemp
		var buttonOut = []
		for (var i=0; i<carrierData.length; i++){
			stringTemp = "./image/ship/" + carrierData[i].id + '.jpg'
			if (  carrierData[i].select > 1) {
				idTemp = carrierData[i].id
			}
			
			buttonTemp = (
				<ToggleImgButton
					key={"carrierButton" + i.toString()}
					modelId={carrierData[i].id}
					display={idTemp}
					onClickFunc={(modelId) => carrierSelect(modelId)}
					Cactive={"carrier-button mdl-button--raised mdl-button--colored"}
					Cinactive={"carrier-button"}
					imgSrc={stringTemp}
					title={carrierData[i].name} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<div className="mdl-cell mdl-cell--2-col mdl-shadow--4dp">
				{buttonOut}
			</div>
		)
	}
}

Carriers.propTypes = {
	carrierData: PropTypes.array.isRequired,
	selectData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
	return {
		carrierData: state.dbStore.dbCarrierTypeQuery,
		selectData: state.dbStore.dbCarrierSelect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		carrierSelect: bindActionCreators(carrierSelect, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Carriers)
