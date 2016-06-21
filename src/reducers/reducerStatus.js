import {
	STATUS_INITIAL,
	STATUS_CHANGE
} from '../constants/ConstActionTypes'

import { dbCarrier } from './database'
import { calcSlotAircontrol, calcSlotFirepower, calcSlotAirstrike, calcSlotSonar } from './calcSlot'
import { listCarrierThead, searchName, searchSlot, searchSkill, searchText } from '../constants/ConstList'

const initialState = {
	status: 'air',
	airControl: 0,
	airDamage: 100,
	outputInfo: [],
	outputD3: []
}

// ===============================================================================
// Reducer main function
// ===============================================================================

export default function reducerStatus(state = initialState, action) {
	var infoOutput = []
	
	switch (action.type) {
		case STATUS_INITIAL:
			infoOutput = genInfoOutput(state.status, action.airDamage)
			return Object.assign({}, state, {
				airControl: action.airControl,
				airDamage: action.airDamage,
				outputInfo: infoOutput,
				outputD3: genD3Output(state.status, action.airControl, infoOutput )
			})
		case STATUS_CHANGE:
			infoOutput = genInfoOutput(action.modelId, state.airDamage)
			return Object.assign({}, state, {
				status: action.modelId,
				outputInfo: infoOutput,
				outputD3: genD3Output(action.modelId, state.airControl, infoOutput )
			})
		default:
			return state
	}
}

// ===============================================================================
// Reducer functions: generate output for status -> info page
// ===============================================================================

function genInfoOutput(status, airDamage) {
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
						output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+2]
						output[i][searchSlot[j]] = calcSlotAircontrol( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i][searchSlot[j]], dbCarrierSelect[i][searchSkill[j]] )
						tempValue = tempValue + output[i][searchSlot[j]]
					}
				}
				output[i].total = tempValue
			}
			break
		case "airstrike":
			for (var i=0; i<dbCarrierSelect.length; i++) {
				output[i] = {}
				tempValue = 0
				tempObject = {}
				output[i].imgsrc = 'image/ship/' + dbCarrierSelect[i].id + '.jpg'
				
				for (var j=0; j<searchName.length; j++) {
					if ( dbCarrierSelect[i][searchName[j]] ) {
						output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+2]
						tempObject = calcSlotAirstrike( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i][searchSlot[j]], airDamage )
						output[i][searchSlot[j]] = tempObject.string
						tempValue = tempValue + tempObject.dam
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
								output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+2]
								tempObject = calcSlotFirepower( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i].type )
								output[i][searchSlot[j]] = tempObject.firepower
								tempHit = tempHit + tempObject.hit
								tempEvade = tempEvade + tempObject.evade
							}
						}
						break
					default:
						for (var j=0; j<searchName.length; j++) {
							if ( dbCarrierSelect[i][searchName[j]] ) {
								output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+2]
								tempObject = calcSlotFirepower( dbCarrierSelect[i][searchName[j]], dbCarrierSelect[i].type )
								tempHit = tempHit + tempObject.hit
								tempEvade = tempEvade + tempObject.evade
							}
						}
				}
				output[i].firepower = dbCarrierSelect[i].firepowerEQ
				output[i].total = "火力:" + dbCarrierSelect[i].firepowerEQ + " 命中+" + tempHit + " 迴避+" + tempEvade
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
								output[i][searchText[j]] = dbCarrierSelect[i].name + " " + listCarrierThead[j+2]
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
				output[i].firepower = tempFirepower
				output[i].total = "反潛:" + tempFirepower + " 命中+" + tempHit + " 迴避+" + tempEvade
			}
			break
	}
	return output
}

// ===============================================================================
// Reducer functions: generate output for status -> d3 page
// ===============================================================================

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

