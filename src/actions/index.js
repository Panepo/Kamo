import * as types from '../constants/ConstActionTypes'

export function statusChange(modelId) {
	return {
		type: types.STATUS_CHANGE,
		modelId
	}
}

export function typeChange(modelId) {
	return {
		type: types.TYPE_CHANGE,
		modelId
	}
}

