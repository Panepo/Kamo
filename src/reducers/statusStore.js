import {
	STATUS_INITIAL,
	STATUS_CHANGE
} from '../constants/ConstActionTypes'

import { dbAircraft, dbCarrier, calcSlotAircontrol } from './dbStore'
import { listCarrierThead, searchName, searchSlot, searchSkill, searchText } from '../constants/ConstList'

const initialState = {
	status: 'air',
	airControl: 0,
	outputInfo: [],
	outputD3: []
}

export default function statusStore(state = initialState, action) {
	var infoOutput = []
	
	switch (action.type) {
		case STATUS_INITIAL:
			infoOutput = genInfoOutput(state.status)
			return Object.assign({}, state, {
				airControl: action.airControl,
				outputInfo: infoOutput,
				outputD3: genD3Output(state.status, action.airControl, infoOutput )
			})
		case STATUS_CHANGE:
			infoOutput = genInfoOutput(action.modelId)
			return Object.assign({}, state, {
				status: action.modelId,
				outputInfo: infoOutput,
				outputD3: genD3Output(action.modelId, state.airControl, infoOutput )
			})
		default:
			return state
	}
}

function genInfoOutput(status) {
	var output = []
	var dbCarrierSelect = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
	var tempAcValue = 0
	var tempText = ""
	var tempString = ""
	
	switch (status) {
		case "air":
			for (var i=0; i<dbCarrierSelect.length; i++) {
				output[i] = {}
				tempAcValue = 0
				output[i].imgsrc = 'image/ship/' + dbCarrierSelect[i].id + '.jpg'
				
				for (var j=0; j<searchName.length; j++) {
					if ( dbCarrierSelect[i][searchName[j]] ) {
						output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+1]
						output[i][searchSlot[j]] = calcSlotAircontrol( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i][searchSlot[j]], dbCarrierSelect[i][searchSkill[j]] )
						tempAcValue = tempAcValue + output[i][searchSlot[j]]
					}
				}
				output[i].total = tempAcValue
				tempString = "船艦総制空力: " + tempAcValue.toString()
				
				for (var j=0; j<searchName.length; j++) {
					if ( dbCarrierSelect[i][searchName[j]] ) {
						tempText = listCarrierThead[j+1] + ": " + output[i][searchSlot[j]].toString()
						tempString = tempString + " " + tempText
					}
				}
				
				output[i].text = tempString
			}
		break
	}
	return output
}


function genD3Output(status, airControl, infoOutput) {
	var output = []
	var count = 0
	
	switch (status) {
		case "air":
			count = 0;
			for (var i=0; i<infoOutput.length; i++) {
				for (var j=0; j<searchName.length; j++) {
					if ( infoOutput[i][searchSlot[j]] ) {
						output[count] = {}
						output[count].label = infoOutput[i][searchText[j]]
						output[count].value = Math.floor ( infoOutput[i][searchSlot[j]] *100 / airControl )
						count = count + 1
					}
				}
			}
		break
	}
	
	return output
}



