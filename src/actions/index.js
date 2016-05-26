import * as types from '../constants/ConstActionTypes'

export function statusChange(modelId) {
	return {
		type: types.STATUS_CHANGE,
		modelId
	}
}

