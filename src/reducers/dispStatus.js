import {
	STATUS_CHANGE
} from '../constants/ConstActionTypes'

const initialState = {
	status: 'group'
}

export default function imageModel(state = initialState, action) {
	switch (action.type) {
		case STATUS_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		default:
			return state
	}
}
