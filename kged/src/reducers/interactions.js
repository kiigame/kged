import { fetchInteractions } from 'api'

const initialState = {
    interactions: fetchInteractions(),
    activeInteraction: undefined
}

function interactions(state = initialState, action) {

    switch (action.type) {
        case 'ADD_INTERACTION':
            return state

        case 'UPDATE_INTERACTION':
            return state

        case 'DELETE_INTERACTION':
            return state

        case 'SET_ACTIVE_INTERACTION':
            return {
                ...state,
                activeInteraction: action.payload.interaction
            }

        default:
            return state
    }
}

export default interactions
