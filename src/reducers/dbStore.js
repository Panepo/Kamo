import {
	AIRCRAFT_TYPE_CHANGE,
	AIRCRAFT_CHANGE,
	CARRIER_SELECT,
	CARRIER_SLOT_SELECT
} from '../constants/ConstActionTypes'

// ===============================================================================
// Initial database
// ===============================================================================

import lokijs from 'lokijs'
import aircraftData from '../../raw/aircrafts.json'
import carrierData from '../../raw/carriers.json'

var db = new lokijs('db')
var dbAircraft = db.addCollection("dbAircraft")
var dbCarrier = db.addCollection("dbCarrier")

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
	aircraftTypeSelect: 'fighter',
	aircraftSelect: '19',
	airControl: 0,
	dbAircraftTypeQuery: dbAircraft.chain().find({ 'type': 'fighter' }).simplesort('id').data(),
	dbAircraftSelect: dbAircraft.chain().find({ 'id': '19' }).data(),
	dbCarrierTypeQuery: dbCarrier.chain().find({ 'fighter': 1 }).simplesort('type').data(),
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
			var tempDb = dbAircraft.chain().find({ 'type': action.modelId }).simplesort('id').data()
			
			return Object.assign({}, state, {
				aircraftTypeSelect: action.modelId,
				aircraftSelect: tempDb[0].id,
				dbAircraftTypeQuery: tempDb,
				dbAircraftSelect: dbAircraft.chain().find({ 'id': tempDb[0].id }).data(),
				dbCarrierTypeQuery: dbCarrier.chain().where( function( obj ){ return obj[action.modelId] == 1 }).simplesort('type').data()
			})
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
			var selectedAC = dbAircraft.findOne({'id': state.aircraftSelect })
			var dbTemp
			
			if ( state.aircraftSelect === '0' ) {
				seletcedTarget[slotID] = null
				seletcedTarget[slotName] = null
				seletcedTarget[slotType] = null
				dbCarrier.update(seletcedTarget)
				dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
				return Object.assign({}, state, {
					dbCarrierSelect: dbTemp,
					airControl: calcAirControl(dbTemp)
				})
			}
			
			if ( seletcedTarget[slotID] === state.aircraftSelect ) {
				seletcedTarget[slotID] = null
				seletcedTarget[slotName] = null
				seletcedTarget[slotType] = null
				dbCarrier.update(seletcedTarget)
				dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
				calcAirControl(dbTemp)
				return Object.assign({}, state, {
					dbCarrierSelect: dbTemp,
					airControl: calcAirControl(dbTemp)
				})
			} else {
				if ( seletcedTarget[selectedAC.type] === 1 ) {
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.short
					seletcedTarget[slotType] = selectedAC.type
					dbCarrier.update(seletcedTarget)
					dbTemp = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					return Object.assign({}, state, {
						dbCarrierSelect: dbTemp,
						airControl: calcAirControl(dbTemp)
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

function calcAirControl(input) {
	const searchName = ["slot1id", "slot2id", "slot3id", "slot4id"]
	const searchSlot = ["slot1", "slot2", "slot3", "slot4"]
	
	var acValue = 0;
	var tempSelect = []
	
	for (var i=0; i<input.length; i++) {
		for (var j=0; j<searchName.length; j++) {
			if ( input[i][searchName[j]] ) {
				tempSelect = dbAircraft.findOne({'id': input[i][searchName[j]] })
				acValue = acValue + Math.floor( tempSelect.air * Math.sqrt(input[i][searchSlot[j]] ) )
			}
		}
	}

	return acValue
}












