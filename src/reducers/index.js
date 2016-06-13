import { combineReducers } from 'redux'
import { default as dispStatus } from './dispStatus'
import { default as dbStore } from './dbStore'
import { default as statusStore } from './statusStore'

export default combineReducers({
	dispStatus,
	dbStore,
	statusStore
})
