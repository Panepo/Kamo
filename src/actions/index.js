import * as types from '../constants/ConstActionTypes'

export function modelOpen(modelId) {
	return {
		type: types.MODEL_OPEN,
		modelId
	}
}

export function modelClose(modelId) {
	return {
		type: types.MODEL_CLOSE,
		modelId
	}
}

export function toggleChange(toggleId) {
	return {
		type: types.TOGGLE_CHANGE,
		toggleId
	}
}

export function dayChange(dayId) {
	return {
		type: types.DAY_CHANGE,
		dayId
	}
}

export function sortChange(sortId) {
	return {
		type: types.SORT_CHANGE,
		sortId
	}
}

export function typeChange(charType) {
	return {
		type: types.TYPE_CHANGE,
		charType
	}
}
