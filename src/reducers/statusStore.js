import {
	STATUS_INITIAL,
	STATUS_CHANGE
} from '../constants/ConstActionTypes'

import { dbAircraft, dbCarrier, calcSlotAircontrol } from './dbStore'
import { listCarrierThead, searchName, searchSlot, searchSkill } from '../constants/ConstList'

const initialState = {
	status: 'air',
	output: []
}

export default function statusStore(state = initialState, action) {
	switch (action.type) {
		case STATUS_INITIAL:
			return Object.assign({}, state, {
				output: genD3output(state.status, action.airControl)
			})
		case STATUS_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		default:
			return state
	}
}

function genD3output(status, airControl) {
	var output = []
	var dbCarrierSelect = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
	var slotAcValue = 0
	var count = 0
	
	switch (status){
		case "air":
			count = 0;
			for (var i=0; i<dbCarrierSelect.length; i++) {
				for (var j=0; j<searchName.length; j++) {
					if ( dbCarrierSelect[i][searchName[j]] ) {
						output[count] = {}
						output[count].label = dbCarrierSelect[i].name + " " + listCarrierThead[j+1]
						slotAcValue = calcSlotAircontrol( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i][searchSlot[j]], dbCarrierSelect[i][searchSkill[j]] )
						output[count].value = Math.floor ( slotAcValue*100/airControl )
						count = count + 1
					}
				}
			}
		break
	}
	
	return output
}
