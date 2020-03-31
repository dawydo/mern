import { FETCH_MEMBER } from '../actions/types'

export default function(state = [], action) {
    //console.log(action, state)
    switch  (action.type) {
        case FETCH_MEMBER:
            return action.payload;
            default:
                return state;
                
    }
    
}

// wire to reducers()