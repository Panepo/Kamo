import {
	STATUS_INITIAL,
	STATUS_CHANGE
} from '../constants/ConstActionTypes'

import { dbAircraft, dbCarrier } from './dbStore'
import { listCarrierThead } from '../constants/ConstList'

const initialState = {
	status: 'air',
	output: []
}

export default function statusStore(state = initialState, action) {
	switch (action.type) {
		case STATUS_INITIAL:
			return Object.assign({}, state, {
				output: generateD3output(state.status, action.airControl)
			})
		case STATUS_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		default:
			return state
	}
}

function generateD3output(status, airControl) {
	const searchSlot = ["slot1", "slot2", "slot3", "slot4"]
	const searchName = ["slot1id", "slot2id", "slot3id", "slot4id"]
	const searchSkill = ["slot1skill", "slot2skill", "slot3skill", "slot4skill"]
	var output = []
	var dbCarrierSelect = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
	var slotAcValue = 0
	
	switch (status){
		case "air":
			var count = 0;
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

function calcSlotAircontrol(aircraftId, slotSize, slotSkill ) {
	var aircraftSelect = dbAircraft.findOne({'id': aircraftId })
	var acValue = 0
	
	switch ( aircraftSelect.type ) {
		case 'fighter':
		case 'seaplaneX':
			acValue = acValue + Math.floor( aircraftSelect.air * Math.sqrt(slotSize))

			switch ( slotSkill ) {
				case 1:
					acValue = acValue + 0 + 1
					break
				case 2:
					acValue = acValue + 2 + 1
					break
				case 3:
					acValue = acValue + 5 + 2
					break
				case 4:
					acValue = acValue + 9 + 2
					break
				case 5:
					acValue = acValue + 14 + 2
					break
				case 6:
					acValue = acValue + 14 + 3
					break
				case 7:
					acValue = acValue + 22 + 3
					break
			}
			
			break
		case 'bomber':
		case 'torpedo':
			if ( aircraftSelect.air > 0 ) {
				acValue = acValue + Math.floor( aircraftSelect.air * Math.sqrt(slotSize))
			}
			
			switch ( slotSkill ) {
				case 1:
					acValue = acValue + 1
					break
				case 2:
					acValue = acValue + 1
					break
				case 3:
					acValue = acValue + 2
					break
				case 4:
					acValue = acValue + 2
					break
				case 5:
					acValue = acValue + 2
					break
				case 6:
					acValue = acValue + 3
					break
				case 7:
					acValue = acValue + 3
					break
			}
			
			break 
		case 'seaplane':
			if ( aircraftSelect.air > 0 ) {
				acValue = acValue + Math.floor( aircraftSelect.air * Math.sqrt(slotSize))
			}
			
			switch ( slotSkill ) {
				case 1:
					acValue = acValue + 0 + 1
					break
				case 2:
					acValue = acValue + 1 + 1
					break
				case 3:
					acValue = acValue + 1 + 2
					break
				case 4:
					acValue = acValue + 1 + 2
					break
				case 5:
					acValue = acValue + 3 + 2
					break
				case 6:
					acValue = acValue + 3 + 3
					break
				case 7:
					acValue = acValue + 6 + 3
					break
			}
			break
	}
	
	return acValue
}