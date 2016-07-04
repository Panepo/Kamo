import {
	AIRCRAFT_TYPE_CHANGE,
	AIRCRAFT_CHANGE,
	AIRCRAFT_SKILL_CHANGE,
	AIRCRAFT_FACTORY_CHANGE,
	CARRIER_SELECT,
	CARRIER_SLOT_SELECT,
	CARRIER_DISPLAY,
	CALC_STATUS
} from '../constants/ConstActionTypes'

import { dbAircraft, dbCarrier } from './database'
import { searchName, searchSlot, searchText } from '../constants/ConstList'
import { calcGroupAir, calcGroupText } from './calcGroup'
import { calcSlotText, calcSlotFirepower } from './calcSlot'

const initialState = {
	aircraftTypeSelect: '',
	aircraftSelect: '0',
	aircraftSkill: "7",
	aircraftFactory: "0",
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

export default function reducerGroup(state = initialState, action) {
	switch (action.type) {
		// ===============================================================================
		// AIRCRAFT_TYPE_CHANGE
		// ===============================================================================
		case AIRCRAFT_TYPE_CHANGE:
			if ( state.aircraftTypeSelect != action.modelId ) {
				var tempDb = dbAircraft.chain().find({ 'type': action.modelId }).simplesort('name').data()
				calcGroupText( tempDb[0].id, action.modelId, state.aircraftSkill, state.aircraftFactory)
				
				return Object.assign({}, state, {
					aircraftTypeSelect: action.modelId,
					aircraftSelect: tempDb[0].id,
					dbAircraftTypeQuery: tempDb,
					dbAircraftSelect: dbAircraft.chain().find({ 'id': tempDb[0].id }).data(),
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
					dbCarrierTypeQuery: dbCarrier.chain().find({ 'display': state.carrierDisp }).where( function( obj ){ return obj[action.modelId] == 1 }).simplesort('type').data()
				})
			} else {
				calcGroupText( '', '', state.aircraftSkill, state.aircraftFactory)
				return Object.assign({}, state, {
					aircraftTypeSelect: '',
					aircraftSelect: '0',
					dbAircraftTypeQuery: [],
					dbAircraftSelect: [],
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
					dbCarrierTypeQuery: []
				})
			}
			break
		// ===============================================================================
		// AIRCRAFT_CHANGE
		// ===============================================================================
		case AIRCRAFT_CHANGE:
			if ( state.aircraftSelect === action.modelId ) {
				calcGroupText( '', '', state.aircraftSkill, state.aircraftFactory)
				return Object.assign({}, state, {
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
					aircraftSelect: '0',
					dbAircraftSelect: []
				})
			} else {
				var tempDb = dbAircraft.chain().find({ 'id': action.modelId }).data()
				calcGroupText( action.modelId, tempDb[0].type, state.aircraftSkill, state.aircraftFactory)
				return Object.assign({}, state, {
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
					aircraftSelect: action.modelId,
					dbAircraftSelect: tempDb
				})
			}
		// ===============================================================================
		// AIRCRAFT_SKILL_CHANGE
		// ===============================================================================
		case AIRCRAFT_SKILL_CHANGE:
			if ( state.aircraftSelect != '0' ) {
				var tempDb = dbAircraft.findOne({'id': state.aircraftSelect })
				calcGroupText( tempDb.id, tempDb.type, action.modelId, state.aircraftFactory)
				return Object.assign({}, state, {
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
					aircraftSkill: action.modelId
				})
			} else {
				return Object.assign({}, state, {
					aircraftSkill: action.modelId
				})
			}
		// ===============================================================================
		// AIRCRAFT_FACTORY_CHANGE
		// ===============================================================================
		case AIRCRAFT_FACTORY_CHANGE:
			if ( state.aircraftSelect != '0' ) {
				var tempDb = dbAircraft.findOne({'id': state.aircraftSelect })
				calcGroupText( tempDb.id, tempDb.type, state.aircraftSkill, action.modelId )
				return Object.assign({}, state, {
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data(),
					aircraftFactory: action.modelId
				})
			} else {
				return Object.assign({}, state, {
					aircraftFactory: action.modelId
				})
			}
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
			var tempDb = dbAircraft.findOne({'id': state.aircraftSelect })
			
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
				carrierSelect.slot1text = null
				carrierSelect.slot1fac = null
				carrierSelect.slot2id = null
				carrierSelect.slot2short = null
				carrierSelect.slot2type = null
				carrierSelect.slot2text = null
				carrierSelect.slot2fac = null
				carrierSelect.slot3id = null
				carrierSelect.slot3short = null
				carrierSelect.slot3type = null
				carrierSelect.slot3text = null
				carrierSelect.slot4fac = null
				carrierSelect.slot4id = null
				carrierSelect.slot4short = null
				carrierSelect.slot4type = null
				carrierSelect.slot4text = null
				carrierSelect.slot5fac = null
				switch ( carrierSelect.type ) {
					case "AC":
					case "CV":
					case "CVL":
					case "TP":
						carrierSelect.firepowerEQ = Math.floor(carrierSelect.firepower * 1.5) + 55
						break
					default:
						carrierSelect.firepowerEQ = carrierSelect.firepower + 5
				}
				if ( carrierSelected.length === 1 ) {
					selectCounter = 10;
				}
			} else {
				if ( carrierSelected.length < 6) {
					carrierSelect.select = selectCounter
					selectCounter++
					for (var i=0; i<searchName.length; i++) {
						if ( !carrierSelect[searchName[i]] ) {
							if ( tempDb.type ) {
								carrierSelect[searchText[i]] = calcSlotText( state.aircraftSelect, tempDb.type, carrierSelect[searchSlot[i]], state.aircraftSkill, state.aircraftFactory)
							} else {
								carrierSelect[searchText[i]] = carrierSelect[searchSlot[i]]
							}
						}
					}
				}
			}
			dbCarrier.update(carrierSelect)
			tempObject = calcGroupAir(carrierSelected)
			
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
			var slotText = selectedSlot + 'text'
			var slotFac = selectedSlot + 'fac'
			var selectedAC = dbAircraft.findOne({'id': state.aircraftSelect })
			var dbTemp
			var tempObject = {}
			var tempFP = {}
			
			if ( state.aircraftSelect === '0' ) {
				if ( seletcedTarget[slotID] ) {
					tempFP = calcSlotFirepower( seletcedTarget[slotID], seletcedTarget.type )
					seletcedTarget["firepowerEQ"] = seletcedTarget["firepowerEQ"] - tempFP.firepower
				}
				seletcedTarget[slotID] = null
				seletcedTarget[slotName] = null
				seletcedTarget[slotType] = null
				seletcedTarget[slotSkill] = null
				seletcedTarget[slotFac] = null
				seletcedTarget[slotText] = calcSlotText( "", "", seletcedTarget[selectedSlot], state.aircraftSkill)
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
					tempFP = calcSlotFirepower( selectedAC.id, seletcedTarget.type )
					seletcedTarget[slotID] = null
					seletcedTarget[slotName] = null
					seletcedTarget[slotType] = null
					seletcedTarget[slotSkill] = null
					seletcedTarget[slotFac] = null
					seletcedTarget[slotText] = calcSlotText( selectedAC.id, selectedAC.type, seletcedTarget[selectedSlot], state.aircraftSkill, state.aircraftFactory)
					seletcedTarget["firepowerEQ"] = seletcedTarget["firepowerEQ"] - tempFP.firepower
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
					tempFP = calcSlotFirepower( selectedAC.id, seletcedTarget.type )
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					seletcedTarget[slotSkill] = state.aircraftSkill
					seletcedTarget[slotFac] = state.aircraftFactory
					seletcedTarget[slotText] = ""
					seletcedTarget["firepowerEQ"] = seletcedTarget["firepowerEQ"] + tempFP.firepower
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
					tempFP = calcSlotFirepower( selectedAC.id, seletcedTarget.type )
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					seletcedTarget[slotSkill] = state.aircraftSkill
					seletcedTarget[slotFac] = state.aircraftFactory
					seletcedTarget[slotText] = ""
					seletcedTarget["firepowerEQ"] = seletcedTarget["firepowerEQ"] + tempFP.firepower
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


