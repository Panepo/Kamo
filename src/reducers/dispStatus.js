import {
	PAGE_CHANGE
} from '../constants/ConstActionTypes'

const initialState = {
	status: 'group'
}

export default function dispStatus(state = initialState, action) {
	switch (action.type) {
		case PAGE_CHANGE:
			return Object.assign({}, state, {
				status: action.modelId
			})
		default:
			return state
	}
}
