import {
	STATUS_CHANGE
} from '../constants/ConstActionTypes'


const initialState = {
	data: [],
	status: 'air',
	output: []
}

export default function statusStore(state = initialState, action) {
	switch (action.type) {
			return Object.assign({}, state, {
				data: action.data
			})
		case STATUS_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		default:
			return state
	}
}
