import { combineReducers } from 'redux'
import { default as dispStatus } from './dispStatus'
import { default as dataAircraft } from './dataAircraft'

export default combineReducers({
	dispStatus,
	dataAircraft
})
