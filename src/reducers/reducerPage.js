import {
	PAGE_CHANGE,
	MODEL_OPEN,
	MODEL_CLOSE
} from '../constants/ConstActionTypes'

import { calcOutputText } from './calcGroup'

const initialState = {
	status: 'group',
	modelStatus: false,
	textOutput: []
}
var tempStatus = []

export default function reducerPage(state = initialState, action) {
	switch (action.type) {
		case PAGE_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		case MODEL_OPEN:
			return Object.assign({}, state, {
				modelStatus: true,
				textOutput: calcOutputText()
			})
		case MODEL_CLOSE:
			return Object.assign({}, state, {
				modelStatus: false
			})
		default:
			return state
	}
	
	
}
