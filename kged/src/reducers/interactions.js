import { omit } from 'lodash/fp'

const initialState = {
    interactions: {},
    activeInteraction: undefined
}

function interactions(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_INTERACTIONS':
            return {
                ...state,
                interactions: action.payload.interactions
            }

        case 'ADD_INTERACTION':
            return state

        case 'UPDATE_INTERACTION':
            return state

        case 'DELETE_INTERACTION':
            return {
                ...state,
                interactions: omit(action.payload.interaction,state.interactions)
            }

        case 'SET_ACTIVE_INTERACTION':
            return {
                ...state,
                activeInteraction: action.payload.interaction
            }

        case 'SET_DOOR_INTERACTION':
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    [action.payload.interaction]: {
                        'click': [
                            {
                                'command': 'do_transition',
                                'destination': action.payload.destination
                            }
                        ]
                    }
                }
            }

        case 'SET_EXAMINE_INTERACTION':
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    [action.payload.interaction]: {
                        'click': [
                            {
                                'command': 'monologue',
                                'textkey': {
                                    'object': action.payload.interaction,
                                    'string': 'examine'
                                }
                            }
                        ]
                    }
                }
            }

        default:
            return state
    }
}

export default interactions
