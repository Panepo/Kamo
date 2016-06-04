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
	aircraftSelect: '0',
	dbAircraftTypeQuery: dbAircraft.chain().find({ 'type': 'fighter' }).simplesort('id').data(),
	dbCarrierTypeQuery: dbCarrier.chain().find({ 'fighter': 1 }).simplesort('type').data(),
	dbCarrierSelect: []
}

// ===============================================================================
// Reducer main function
// ===============================================================================

var selectCounter = 10

export default function dbStore(state = initialState, action) {
	switch (action.type) {
		case AIRCRAFT_TYPE_CHANGE:
			return Object.assign({}, state, {
				aircraftTypeSelect: action.modelId,
				dbAircraftTypeQuery: dbAircraft.chain().find({ 'type': action.modelId }).simplesort('id').data(),
				dbCarrierTypeQuery: dbCarrier.chain().where( function( obj ){ return obj[action.modelId] == 1 }).simplesort('type').data()
			})
		case AIRCRAFT_CHANGE:
			if ( state.aircraftSelect === action.modelId ) {
				return Object.assign({}, state, {
					aircraftSelect: '0'
				})
			} else {
				return Object.assign({}, state, {
					aircraftSelect: action.modelId
				})
			}
		case CARRIER_SELECT:
			var carrierSelect = dbCarrier.findOne({'id': action.modelId })
			var carrierSelected = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('type').data()
			
			if ( carrierSelect.select > 0 ) {
				carrierSelect.select = 0;
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
		case CARRIER_SLOT_SELECT:
			var selectedID = action.modelId.slice(5)
			var selectedSlot = action.modelId.slice(0,5)
			var seletcedTarget = dbCarrier.findOne({'id': selectedID })
			var slotID = selectedSlot + 'id'
			var slotName = selectedSlot + 'name'
			var slotType = selectedSlot + 'type'
			var selectedAC = dbAircraft.findOne({'id': state.aircraftSelect })
			
			if ( seletcedTarget[slotID] === state.aircraftSelect ) {
				seletcedTarget[slotID] = null
				seletcedTarget[slotName] = null
				seletcedTarget[slotType] = null
				dbCarrier.update(seletcedTarget)
				return Object.assign({}, state, {
					dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
				})
			} else {
				if ( seletcedTarget[selectedAC.type] === 1 ) {
					seletcedTarget[slotID] = selectedAC.id
					seletcedTarget[slotName] = selectedAC.name
					seletcedTarget[slotType] = selectedAC.type
					dbCarrier.update(seletcedTarget)
					return Object.assign({}, state, {
						dbCarrierSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
					})
				}
			}
			break
		default:
			return state
	}
}
