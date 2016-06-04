import {
	AIRCRAFT_TYPE_CHANGE,
	CARRIER_SELECT
} from '../constants/ConstActionTypes'

import lokijs from 'lokijs'
import carrierData from '../../raw/carriers.json'

var db = new lokijs('db')
var dbCarrier = db.addCollection("dbCarrier")

for (var i=0; i<carrierData.length; i++) {
	dbCarrier.insert(carrierData[i])
}

const initialState = {
	dbTypeQuery: dbCarrier.chain().find({ 'fighter': 1 }).simplesort('type').data(),
	dbSelect: []
}

export default function dataCarrier(state = initialState, action) {
	switch (action.type) {
		case AIRCRAFT_TYPE_CHANGE:
			return Object.assign({}, state, {
				dbTypeQuery: dbCarrier.chain().where( function( obj ){ return obj[action.modelId] == 1 }).simplesort('type').data()
			})
		case CARRIER_SELECT:
			var carrierSelect = dbCarrier.findOne({'id': action.modelId })
			var carrierSelected = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('type').data()
			
			if ( carrierSelect.select > 0 ) {
				carrierSelect.select = 0;
			} else {
				if ( carrierSelected.length < 6) {
					carrierSelect.select = 11 + carrierSelected.length;
				}
			}
			dbCarrier.update(carrierSelect)
			
			return Object.assign({}, state, {
				dbSelect: dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
			})
			
		default:
			return state
	}
}
