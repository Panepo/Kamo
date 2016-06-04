import { combineReducers } from 'redux'
import { default as dispStatus } from './dispStatus'
import { default as dbStore } from './dbStore'

export default combineReducers({
	dispStatus,
	dbStore
})
