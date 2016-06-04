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

export function carrierSelect(modelId) {
	return {
		type: types.CARRIER_SELECT,
		modelId
	}
}

export function carrierSlotSelect(modelId) {
	return {
		type: types.CARRIER_SLOT_SELECT,
		modelId
	}
}
