import * as types from '../constants/ConstActionTypes'

export function pageChange(modelId) {
	return {
		type: types.PAGE_CHANGE,
		modelId
	}
}

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

export function aircraftSkillChange(modelId) {
	return {
		type: types.AIRCRAFT_SKILL_CHANGE,
		modelId
	}
}

export function aircraftFactoryChange(modelId) {
	return {
		type: types.AIRCRAFT_FACTORY_CHANGE,
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

export function carrierDisplay(modelId) {
	return {
		type: types.CARRIER_DISPLAY,
		modelId
	}
}

export function statusInitial( airControl, airDamage ) {
	return {
		type: types.STATUS_INITIAL,
		airControl,
		airDamage
	}
}

export function statusChange(modelId) {
	return {
		type: types.STATUS_CHANGE,
		modelId
	}
}
