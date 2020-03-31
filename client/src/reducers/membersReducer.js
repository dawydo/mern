import { FETCH_MEMBERS } from '../actions/types'

export default function(state = [], action) {
    //console.log(action, state)
    switch  (action.type) {
        case FETCH_MEMBERS:
            return action.payload;
            default:
                return state;
    }
    
}

// wire to reducers()