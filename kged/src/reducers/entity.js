const initialState = {
    activeEntity: {}
}

function entity(state = initialState, action, globalState = {}) {
    switch (action.type) {
        case 'SET_ACTIVE_ENTITY':
            return {
                ...state,
                activeEntity: action.payload.id
            }

        case 'REMOVE_ACTIVE_ENTITY':
            return {
                ...state,
                activeEntity: {}
            }

        default:
            return state
    }
}

export default entity
