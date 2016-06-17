import {
	AIRCRAFT_TYPE_CHANGE,
	AIRCRAFT_CHANGE,
	AIRCRAFT_SKILL_DISPLAY,
	AIRCRAFT_SKILL_CHANGE,
	CARRIER_SELECT,
	CARRIER_SLOT_SELECT,
	CARRIER_DISPLAY,
	CALC_STATUS
} from '../constants/ConstActionTypes'

import { searchName, searchSlot, searchSkill } from '../constants/ConstList'
import { calcSlotAircontrol, calcSlotScout, calcSlotScout2 } from './calcSlot'

// ===============================================================================
// Initial database
// ===============================================================================

import lokijs from 'lokijs'
import aircraftData from '../../raw/aircrafts.json'
import carrierData from '../../raw/carriers.json'

var db = new lokijs('db')
export var dbAircraft = db.addCollection("dbAircraft")
export var dbCarrier = db.addCollection("dbCarrier")

for (var i=0; i<aircraftData.length; i++) {
	dbAircraft.insert(aircraftData[i])
}

for (var i=0; i<carrierData.length; i++) {
	dbCarrier.insert(carrierData[i])
}

// ===============================================================================
// Initial state
// ===============================================================================

const initialState = {
	aircraftTypeSelect: '',
	aircraftSelect: '',
	aircraftSkillDisp: 1,
	aircraftSkill: 7,
	aircraftCount: 0,
	airControl: 0,
	scout: 0,
	scout0: 0,
	scout1: 0,
	scout2: 0,
	scout3: 0,
	airDamage: 100,
	carrierDisp: 1,
	dbAircraftTypeQuery: [],
	dbAircraftSelect: [],
	dbCarrierTypeQuery: [],
	dbCarrierSelect: []
}

// ===============================================================================
// Reducer main function
// ===============================================================================

var selectCounter = 10

export default function dbStore(state = initialState, action) {
	switch (action.type) {
		// ===============================================================================
		// AIRCRAFT_TYPE_CHANGE
		// ===============================================================================
		case AIRCRAFT_TYPE_CHANGE:
			if ( state.aircraftTypeSelect != action.modelId ) {
				var tempDb = dbAircraft.chain().find({ 'type': action.modelId }).simplesort('name').data()
				
				return Object.assign({}, state, {
					aircraftTypeSelect: action.modelId,
					aircraftSelect: tempDb[0].id,
					dbAircraftTypeQuery: tempDb,
					dbAircraftSelect: dbAircraft.chain().find({ 'id': tempDb[0].id }).data(),
					dbCarrierTypeQuery: dbCarrier.chain().find({ 'display': state.carrierDisp }).where( function( obj ){ return obj[action.modelId] == 1 }).simplesort('type').data()
				})
			} else {
				return Object.assign({}, state, {
					aircraftTypeSelect: '',
					aircraftSelect: '',
					dbAircraftTypeQuery: [],
					dbAircraftSelect: [],
					dbCarrierTypeQuery: []
				})
			}
			break
		// ===============================================================================
		// AIRCRAFT_CHANGE
		// ===============================================================================
		case AIRCRAFT_CHANGE:
			if ( state.aircraftSelect === action.modelId ) {
				return Object.assign({}, state, {
					aircraftSelect: '0',
					dbAircraftSelect: []
				})
			} else {
				return Object.assign({}, state, {
					aircraftSelect: action.modelId,
					dbAircraftSelect: dbAircraft.chain().find({ 'id': action.modelId }).data()
				})
			}
		// ===============================================================================
		// AIRCRAFT_SKILL_DISPLAY
		// ===============================================================================
		case AIRCRAFT_SKILL_DISPLAY:
			if ( state.aircraftSkillDisp === 0 ) {
				return Object.assign({}, state, {
						aircraftSkillDisp: 1
					})
			} else {
				return Object.assign({}, state, {
						aircraftSkillDisp: 0
					})
			}
		// ===============================================================================
		// AIRCRAFT_SKILL_CHANGE
		// ===============================================================================
		case AIRCRAFT_SKILL_CHANGE:
			return Object.assign({}, state, {
					aircraftSkill: action.modelId
				})
		// ===============================================================================
		// CARRIER_DISPLAY
		// ===============================================================================
		case CARRIER_DISPLAY:
			if ( state.carrierDisp === 1 ) {
				return Object.assign({}, state, {
					carrierDisp: 0,
					dbCarrierTypeQuery: dbCarrier.chain().find({ 'display': 0 }).where( function( obj ){ return obj[state.aircraftTypeSelect] == 1 }).simplesort('type').data()
				})
			} else {
				return Object.assign({}, state, {
					carrierDisp: 1,
					dbCarrierTypeQuery: dbCarrier.chain().find({ 'display': 1 }).where( function( obj ){ return obj[state.aircraftTypeSelect] == 1 }).simplesort('type').data()
				})
			}
		// ===============================================================================
		// CARRIER_SELECT
		// ===============================================================================
		case CARRIER_SELECT:
			var carrierSelect = dbCarrier.findOne({'id': action.modelId })
			var carrierSelected = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('type').data()
			var tempCount = state.aircraftCount
			
			if ( carrierSelect.select > 0 ) {
				if ( carrierSelect.slot1id ) {
					tempCount = tempCount - carrierSelect.slot1
				}
				if ( carrierSelect.slot2id ) {
					tempCount = tempCount - carrierSelect.slot2
				}
				if ( carrierSelect.slot3id ) {
					tempCount = tempCount - carrierSelect.slot3
				}
				if ( carrierSelect.slot4id ) {
					tempCount = tempCount - carrierSelect.slot4
				}
				
				carrierSelect.select = 0
				carrierSelect.slot1id = null
				carrierSelect.slot1short = null
				carrierSelect.slot1type = null
				carrierSelect.slot2id = null
				carrierSelect.slot2short = null
				carrierSelect.slot2type = null
				carrierSelect.slot3id = null
				carrierSelect.slot3short = null
				carrierSelect.slot3type = null
				carrierSelect.slot4id = null
				carrierSelect.slot4short = null
				carrierSelect.slot4type = null
				if ( carrierSelected.length === 1 ) {
					selectCounter = 10;
				}
			} else {
				if ( carrierSelected.length < 6) {
					carrierSelect.select = selectCounter
					selectCounter++
				}
			}
			dbCarrier.update(carrierSelect)
			dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
			tempObject = calcGroupAir(dbTemp)
			
			return Object.assign({}, state, {
				dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
				airControl: tempObject.ac,
				scout: tempObject.scout,
				scout0: tempObject.chance0,
				scout1: tempObject.chance1,
				scout2: tempObject.chance2,
				scout3: tempObject.chance3,
				airDamage: tempObject.airDamage,
				aircraftCount: tempCount
			})
		// ===============================================================================
		// CARRIER_SLOT_SELECT
		// ===============================================================================
		case CARRIER_SLOT_SELECT:
			var selectedID = action.modelId.slice(5)
			var selectedSlot = action.modelId.slice(0,5)
			var seletcedTarget = dbCarrier.findOne({'id': selectedID })
			var slotID = selectedSlot + 'id'
			var slotName = selectedSlot + 'short'
			var slotType = selectedSlot + 'type'
			var slotSkill = selectedSlot + 'skill'
			var selectedAC = dbAircraft.findOne({'id': state.aircraftSelect })
			var dbTemp
			var tempObject = {}
			
			if ( state.aircraftSelect === '0' ) {
				seletcedTarget[slotID] = null
				seletcedTarget[slotName] = null
				seletcedTarget[slotType] = null
				seletcedTarget[slotSkill] = null
				dbCarrier.update(seletcedTarget)
				dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
				tempObject = calcGroupAir(dbTemp)
				return Object.assign({}, state, {
					dbCarrierSelect: dbTemp,
					airControl: tempObject.ac,
					scout: tempObject.scout,
					scout0: tempObject.chance0,
					scout1: tempObject.chance1,
					scout2: tempObject.chance2,
					scout3: tempObject.chance3,
					airDamage: tempObject.airDamage,
					aircraftCount: state.aircraftCount - seletcedTarget[selectedSlot]
				})
			}
			
			if ( seletcedTarget[slotID] === state.aircraftSelect ) {
				if ( seletcedTarget[slotSkill] === state.aircraftSkill ) {
					seletcedTarget[slotID] = null
					seletcedTarget[slotName] = null
					seletcedTarget[slotType] = null
					seletcedTarget[slotSkill] = null
					dbCarrier.update(seletcedTarget)
					dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					tempObject = calcGroupAir(dbTemp)
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: tempObject.ac,
						scout: tempObject.scout,
						scout0: tempObject.chance0,
						scout1: tempObject.chance1,
						scout2: tempObject.chance2,
						scout3: tempObject.chance3,
						airDamage: tempObject.airDamage,
						aircraftCount: state.aircraftCount - seletcedTarget[selectedSlot]
					})
				} else {
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					seletcedTarget[slotSkill] = state.aircraftSkill
					dbCarrier.update(seletcedTarget)
					dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					tempObject = calcGroupAir(dbTemp)
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: tempObject.ac,
						scout: tempObject.scout,
						scout0: tempObject.chance0,
						scout1: tempObject.chance1,
						scout2: tempObject.chance2,
						scout3: tempObject.chance3,
						airDamage: tempObject.airDamage,
						aircraftCount: state.aircraftCount
					})
				}
			} else {
				if ( seletcedTarget[selectedAC.type] === 1 ) {
					var tempCount = 0
					if ( seletcedTarget[slotID] ) {
						tempCount = state.aircraftCount
					} else {
						tempCount =  state.aircraftCount + seletcedTarget[selectedSlot]
					}
					
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					seletcedTarget[slotSkill] = state.aircraftSkill
					dbCarrier.update(seletcedTarget)
					dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					tempObject = calcGroupAir(dbTemp)
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: tempObject.ac,
						scout: tempObject.scout,
						scout0: tempObject.chance0,
						scout1: tempObject.chance1,
						scout2: tempObject.chance2,
						scout3: tempObject.chance3,
						airDamage: tempObject.airDamage,
						aircraftCount: tempCount
					})

				}
			}
			break
		// ===============================================================================
		// default
		// ===============================================================================
		default:
			return state
	}
}

function calcGroupAir(input) {
	var output = {}
	output.ac = 0
	output.scout = 0
	output.hit0 = []
	output.hit1 = []
	output.hit2 = []
	output.hit3 = []
	var tempObject = {}
	
	for (var i=0; i<input.length; i++) {
		for (var j=0; j<searchName.length; j++) {
			if ( input[i][searchName[j]] ) {
				output.ac = output.ac + calcSlotAircontrol(input[i][searchName[j]],input[i][searchSlot[j]], input[i][searchSkill[j]] )
				output.scout = output.scout + calcSlotScout(input[i][searchName[j]],input[i][searchSlot[j]] )
				tempObject = calcSlotScout2( input[i][searchName[j]] )
				if ( tempObject.hit0 > 0 ) {
					output.hit0.push( tempObject.hit0 )
				}
				if ( tempObject.hit1 > 0 ) {
					output.hit1.push( tempObject.hit1 )
				}
				if ( tempObject.hit2 > 0 ) {
					output.hit2.push( tempObject.hit2 )
				}
				if ( tempObject.hit3 > 0 ) {
					output.hit3.push( tempObject.hit3 )
				}
			}
		}
	}
	
	
	var tempChance = 1
	for (var i=0; i<output.hit3.length; i++) {
		tempChance = tempChance * ( 1 - output.hit3[i] )
	}
	output.chance3 = 1 - tempChance
	
	tempChance = 1
	for (var i=0; i<output.hit2.length; i++) {
		tempChance = tempChance * ( 1 - output.hit2[i] )
	}
	output.chance2 = (1 - tempChance)*(1 - output.chance3)
	
	tempChance = 1
	for (var i=0; i<output.hit1.length; i++) {
		tempChance = tempChance * ( 1 - output.hit1[i] )
	}
	output.chance1 = (1 - tempChance)*(1 - output.chance2 - output.chance3)
	
	tempChance = 1
	for (var i=0; i<output.hit0.length; i++) {
		tempChance = tempChance * ( 1 - output.hit0[i] )
	}
	output.chance0 = (1 - tempChance)*(1 - output.chance1 - output.chance2 - output.chance3)
	
	output.airDamage = 1 + 0.2 * output.chance3 + 0.17 * output.chance2 + 0.12 * ( output.chance0 + output.chance1)
	
	output.scout = Math.floor(output.scout)
	output.chance0 = Math.floor(output.chance0*100)
	output.chance1 = Math.floor(output.chance1*100)
	output.chance2 = Math.floor(output.chance2*100)
	output.chance3 = Math.floor(output.chance3*100)
	output.airDamage = Math.floor(output.airDamage*100)
	
	return output
}








