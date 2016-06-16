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
	var tempValue = 0
	var tempText = ""
	var tempString = ""
	var tempObject = {}
	var tempFirepower, tempHit, tempEvade = 0
	
	switch (status) {
		case "air":
			for (var i=0; i<dbCarrierSelect.length; i++) {
				output[i] = {}
				tempValue = 0
				output[i].imgsrc = 'image/ship/' + dbCarrierSelect[i].id + '.jpg'
				
				for (var j=0; j<searchName.length; j++) {
					if ( dbCarrierSelect[i][searchName[j]] ) {
						output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+1]
						output[i][searchSlot[j]] = calcSlotAircontrol( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i][searchSlot[j]], dbCarrierSelect[i][searchSkill[j]] )
						tempValue = tempValue + output[i][searchSlot[j]]
					}
				}
				output[i].total = tempValue
			}
			break
		case "firepower":
			for (var i=0; i<dbCarrierSelect.length; i++) {
				output[i] = {}
				tempFirepower = 0
				tempHit = 0
				tempEvade = 0
				tempObject = {}
				output[i].imgsrc = 'image/ship/' + dbCarrierSelect[i].id + '.jpg'
				
				switch ( dbCarrierSelect[i].type ) {
					case "AC":
					case "CV":
					case "CVL":
					case "TP":
						for (var j=0; j<searchName.length; j++) {
							if ( dbCarrierSelect[i][searchName[j]] ) {
								output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+1]
								tempObject = calcSlotFirepower( dbCarrierSelect[i][searchName[j]] )
								output[i][searchSlot[j]] = tempObject.firepower
								tempFirepower = tempFirepower + tempObject.firepower
								tempHit = tempHit + tempObject.hit
								tempEvade = tempEvade + tempObject.evade
							}
						}
						tempFirepower = tempFirepower + 55 + dbCarrierSelect[i].firepower * 1.5
						break
					default:
						for (var j=0; j<searchName.length; j++) {
							if ( dbCarrierSelect[i][searchName[j]] ) {
								output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+1]
								tempObject = calcSlotFirepower( dbCarrierSelect[i][searchName[j]] )
								tempHit = tempHit + tempObject.hit
								tempEvade = tempEvade + tempObject.evade
							}
						}
						tempFirepower = dbCarrierSelect[i].firepower + 5
				}
				
				output[i].total = "火力:" + tempFirepower + " 命中+" + tempHit + " 迴避+" + tempEvade
			}
			break
		case "sonar":
			for (var i=0; i<dbCarrierSelect.length; i++) {
				output[i] = {}
				tempFirepower = 0
				tempHit = 0
				tempEvade = 0
				tempObject = {}
				output[i].imgsrc = 'image/ship/' + dbCarrierSelect[i].id + '.jpg'
				
				switch ( dbCarrierSelect[i].type ) {
					case "BBV":
					case "CAV":
					case "CVL":
					case "TP":
					case "AV":
					case "XA":
					case "TP":
						for (var j=0; j<searchName.length; j++) {
							if ( dbCarrierSelect[i][searchName[j]] ) {
								output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+1]
								tempObject = calcSlotSonar( dbCarrierSelect[i][searchName[j]] )
								output[i][searchSlot[j]] = tempObject.firepower
								tempFirepower = tempFirepower + tempObject.firepower
								tempHit = tempHit + tempObject.hit
								tempEvade = tempEvade + tempObject.evade
							}
						}
						tempFirepower = tempFirepower + 8
						break
				}
				
				output[i].total = "反潛:" + tempFirepower + " 命中+" + tempHit + " 迴避+" + tempEvade
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

function calcSlotFirepower( aircraftId ) {
	var aircraftSelect = dbAircraft.chain().find({ 'id': aircraftId }).data()
	var output = {}
	
	output.firepower = aircraftSelect[0].firepower
	switch ( aircraftSelect[0].type) {
		case "bomber":
			output.firepower = output.firepower + aircraftSelect[0].bomb * 1.3
		break
		case "torpedo":
			output.firepower = output.firepower + aircraftSelect[0].torpedo
		break
	}
	output.firepower = Math.floor( output.firepower * 1.5 )
	output.hit = aircraftSelect[0].hit
	output.evade = aircraftSelect[0].evade
	return output
}

function calcSlotSonar( aircraftId ) {
	var aircraftSelect = dbAircraft.chain().find({ 'id': aircraftId }).data()
	var output = {}
	
	switch ( aircraftSelect[0].type) {
		case "bomber":
		case "torpedo":
		case "seaplane":
		case "heli":
		case "blue":
		case "big":
			output.firepower = aircraftSelect[0].sonar
		break
	}
	output.firepower = Math.floor( output.firepower * 1.5 )
	output.hit = aircraftSelect[0].hit
	output.evade = aircraftSelect[0].evade
	return output
}

