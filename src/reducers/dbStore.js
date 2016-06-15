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
			
			if ( carrierSelect.select > 0 ) {
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
			
			return Object.assign({}, state, {
				dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
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
			
			if ( state.aircraftSelect === '0' ) {
				seletcedTarget[slotID] = null
				seletcedTarget[slotName] = null
				seletcedTarget[slotType] = null
				seletcedTarget[slotSkill] = null
				dbCarrier.update(seletcedTarget)
				dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
				return Object.assign({}, state, {
					dbCarrierSelect: dbTemp,
					airControl: calcAircontrol(dbTemp),
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
					calcAircontrol(dbTemp)
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: calcAircontrol(dbTemp),
						aircraftCount: state.aircraftCount - seletcedTarget[selectedSlot]
					})
				} else {
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					seletcedTarget[slotSkill] = state.aircraftSkill
					dbCarrier.update(seletcedTarget)
					dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: calcAircontrol(dbTemp),
						aircraftCount: state.aircraftCount + seletcedTarget[selectedSlot]
					})
				}
			} else {
				if ( seletcedTarget[selectedAC.type] === 1 ) {
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					seletcedTarget[slotSkill] = state.aircraftSkill
					dbCarrier.update(seletcedTarget)
					dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: calcAircontrol(dbTemp),
						aircraftCount: state.aircraftCount + seletcedTarget[selectedSlot]
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

function calcAircontrol(input) {
	var acValue = 0;
	
	for (var i=0; i<input.length; i++) {
		for (var j=0; j<searchName.length; j++) {
			if ( input[i][searchName[j]] ) {
				acValue = acValue + calcSlotAircontrol(input[i][searchName[j]],input[i][searchSlot[j]], input[i][searchSkill[j]] )
			}
		}
	}
	return acValue
}


export function calcSlotAircontrol(aircraftId, slotSize, slotSkill ) {
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







