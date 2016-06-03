import * as types from '../constants/ConstActionTypes'

export function statusChange(modelId) {
	return {
		type: types.STATUS_CHANGE,
		modelId
	}
}

export function aircraftChange(modelId) {
	return {
		type: types.AIRCRAFT_CHANGE,
		modelId
	}
}

export function aircraftTypeChange(modelId) {
	return {
		type: types.AIRCRAFT_TYPE_CHANGE,
		modelId
	}
}

export function carrierSortChange(modelId) {
	return {
		type: types.CARRIER_SORT_CHANGE,
		modelId
	}
}