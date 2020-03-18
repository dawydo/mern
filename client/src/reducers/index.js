import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'
import membersReducer from './membersReducer'


// Combine recducers
// authReducer = auth
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    members: membersReducer
})