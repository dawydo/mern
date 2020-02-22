import axios from 'axios'
import { FETCH_USER } from './types'

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
