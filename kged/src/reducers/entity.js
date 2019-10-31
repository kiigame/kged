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
            const entityId = action.payload.id || state.activeEntity.attrs.id;
            if (action.payload.category === 'room') {
                return {
                    ...state,
                    activeEntity: globalState.rooms.rooms.find(r =>
                        r.attrs.id === entityId
                    )
                }
            } else if (action.payload.category === 'furniture') {
                return {
                    ...state,
                    activeEntity: globalState.furnitures.furnitures.find(r =>
                        r.attrs.id === entityId
                    )
                }
            } else {
                return state;
            }
        case 'REMOVE_ACTIVE_ENTITY':
            console.log('remove')
            return {
                ...state,
                activeEntity: undefined
            }

        default:
            return state
    }
}

export default entity
