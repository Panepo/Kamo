import { combineReducers } from 'redux'
import { default as dispStatus } from './dispStatus'
import { default as dataAircraft } from './dataAircraft'
import { default as dataCarrier } from './dataCarrier'

export default combineReducers({
	dispStatus,
	dataAircraft,
	dataCarrier
})
