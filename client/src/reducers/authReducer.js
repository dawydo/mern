import { FETCH_USER } from '../actions/types'


// This Reducer is checking if currently user loged-in
// FETCH_USER checks if user exist if not use false
export default function(state = null, action){

    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
};

