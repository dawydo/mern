import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'
import membersReducer from './membersReducer'
import membersInfoReducer from './membersInfoReducer'
import deleteMembersReducer from './deleteMembersReducer'


// Combine recducers 
// authReducer = auth
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    members: membersReducer,
    membersInfo: membersInfoReducer,
    deleteMemberInfo: deleteMembersReducer
})