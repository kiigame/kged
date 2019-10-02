import { combineReducers } from 'redux'
import { GET_ROOM } from '../actions/actions'

function rooms(state = [], action ) {
    switch (action.type) {
        case GET_ROOM:
            return [
                ...state,
                {
                    room: action.room
                }
            ]
        default:
            return state
    }
}
const roomsApp = combineReducers({
    rooms
})

export default roomsApp
