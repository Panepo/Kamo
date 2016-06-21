import { combineReducers } from 'redux'
import { default as reducerPage } from './reducerPage'
import { default as reducerGroup } from './reducerGroup'
import { default as reducerStatus } from './reducerStatus'

export default combineReducers({
	reducerPage,
	reducerGroup,
	reducerStatus
})
