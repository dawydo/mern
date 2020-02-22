import { combineReducers } from 'redux'
import authReducer from './authReducer'


// Combine recducers
// authReducer = auth
export default combineReducers({
    auth: authReducer
})