import {
	TYPE_CHANGE
} from '../constants/ConstActionTypes'

const initialState = {
	status: 'fighter'
}

export default function typeStatus(state = initialState, action) {
	switch (action.type) {
		case TYPE_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		default:
			return state
	}
}
