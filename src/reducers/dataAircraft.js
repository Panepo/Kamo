import {
	TYPE_CHANGE
} from '../constants/ConstActionTypes'

import lokijs from 'lokijs'
import aircraftData from '../../raw/aircrafts.json'

var db = new lokijs('db')
var dbAircraft = db.addCollection("dbAircraft")

for (var i=0; i<aircraftData.length; i++) {
	dbAircraft.insert(aircraftData[i])
}

const initialState = {
	typeSelect: 'fighter',
	output: dbAircraft.chain().find({ 'type': 'fighter' }).simplesort('id').data()
}

export default function dataAircraft(state = initialState, action) {
	switch (action.type) {
		case TYPE_CHANGE:
			return Object.assign({}, state, {
				typeSelect: action.modelId,
				output: dbAircraft.chain().find({ 'type': action.modelId }).simplesort('id').data()
			})
		default:
			return state
	}
}
