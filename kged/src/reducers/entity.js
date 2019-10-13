const initialState = {
    activeEntity: {}
}

function entity(state = initialState, action, globalState = {}) {
    switch (action.type) {
        case 'SET_ACTIVE_ENTITY':
            return {
                ...state,
                activeEntity: action.payload.entity
            }

        case 'UPDATE_ACTIVE_ENTITY':
            if (action.payload.category === 'room') {
                return {
                    ...state,
                    activeEntity: globalState.rooms.rooms.find(r =>
                        r.attrs.id === state.activeEntity.attrs.id
                    )
                }
            } else {
                return state;
            }

        default:
            return state
    }
}

export default entity
