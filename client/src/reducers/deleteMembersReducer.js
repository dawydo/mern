import { DELETE_MEMBERS } from '../actions/types'

export default function(state = [], action) {
    switch  (action.type) {
        case DELETE_MEMBERS:
            return action.payload;
            default:
                return state;
    }
}

// wire to reducers()