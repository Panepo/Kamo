import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleButton from '../components/ToggleButton'
import ToggleImgButton from '../components/ToggleImgButton'
import { carrierSelect, carrierDisplay } from '../actions'
import '../../css/GroupCarriers.css'

class GroupCarriers extends Component {
	componentDidUpdate() {
		componentHandler.upgradeDom()
	}
	
	render() {
		const { carrierData, carrierSelect, selectData, carrierDisp, carrierDisplay } = this.props
		
		var idTemp = ''
		var buttonTemp
		var buttonOut = []
		
		for (var i=0; i<carrierData.length; i++){
			if ( carrierData[i].select > 1) {
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
					imgSrc={"./image/ship/" + carrierData[i].id + '.jpg'}
					text={""}
					title={carrierData[i].name} />
			)
			buttonOut.push(buttonTemp)
		}
		
		return (
			<div className="display-list mdl-cell mdl-cell--2-col mdl-shadow--4dp">
				<ToggleButton
					modelId={"1"}
					key={"carrierDispButton"}
					display={carrierDisp.toString()}
					onClickFunc={(modelId) => carrierDisplay(modelId)}
					Cactive={"aircraft-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary mdl-button--raised"}
					Cinactive={"aircraft-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"}
					title={"最終改造表示"} />
				{buttonOut}
			</div>
		)
	}
}

GroupCarriers.propTypes = {
	carrierData: PropTypes.array.isRequired,
	selectData: PropTypes.array.isRequired,
	carrierDisp: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
	return {
		carrierData: state.reducerGroup.dbCarrierTypeQuery,
		selectData: state.reducerGroup.dbCarrierSelect,
		carrierDisp: state.reducerGroup.carrierDisp
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		carrierSelect: bindActionCreators(carrierSelect, dispatch),
		carrierDisplay: bindActionCreators(carrierDisplay, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupCarriers)
