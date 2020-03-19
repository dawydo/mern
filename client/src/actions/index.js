import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS, FETCH_MEMBERS } from './types'

//Fetch user from Express API (routes/authRoutes.js)
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

        dispatch({ type:FETCH_USER, payload: res.data })
}

//post request to get tokens 
export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    //Look at user model and see how many credits he have
    dispatch({ type:FETCH_USER, payload: res.data })
}

// Sending Suveys form to user
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys')
    dispatch({ type: FETCH_USER, payload: res.data })
}

// Get Surveys data for displaying
export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys')

    // Fetch Surveys user made
    dispatch({ type: FETCH_SURVEYS, payload: res.data })
}



//Fetch Members from Express API (routes/membersRoutes.js)
export const fetchMembers = () => async dispatch => {
    const res = await axios.get('/api/members')
    
        dispatch({ type: FETCH_MEMBERS, payload: res.data })
}