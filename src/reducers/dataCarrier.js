import {
	AIRCRAFT_TYPE_CHANGE,
	CARRIER_SORT_CHANGE
} from '../constants/ConstActionTypes'

import lokijs from 'lokijs'
import carrierData from '../../raw/carriers.json'

var db = new lokijs('db')
var dbCarrier = db.addCollection("dbCarrier")

for (var i=0; i<carrierData.length; i++) {
	dbCarrier.insert(carrierData[i])
}

const initialState = {
	output: dbCarrier.chain().find({ 'fighter': 1 }).simplesort('id').data(),
	typeSelect: 'fighter',
	sort: 'id'
}

export default function dataCarrier(state = initialState, action) {
	switch (action.type) {
		case AIRCRAFT_TYPE_CHANGE:
			return Object.assign({}, state, {
				typeSelect: action.modelId,
				output: dbCarrier.chain().where( function( obj ){ return obj[action.modelId] == 1 }).simplesort(state.sort).data()
			})
		case CARRIER_SORT_CHANGE:
			return Object.assign({}, state, {
				sort: action.modelId,
				output: dbCarrier.chain().where( function( obj ){ return obj[state.typeSelect] == 1 }).simplesort(action.modelId).data()
			})
		default:
			return state
	}
}
