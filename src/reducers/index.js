import { combineReducers } from 'redux'
import { default as dispStatus } from './dispStatus'
import { default as typeStatus } from './typeStatus'

export default combineReducers({
	dispStatus,
	typeStatus
})
