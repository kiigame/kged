export const getActiveEntity = (state) => {
    let activeEntityId = state.entity.activeEntity
    return [
        ...state.rooms.rooms,
        ...state.furnitures.furnitures,
        ...state.items.items
    ].find(e => e.attrs.id === activeEntityId)
}

export const setActiveEntity = (id) => ({
    type: 'SET_ACTIVE_ENTITY',
    payload: {
        id: id
    }
})

export const removeActiveEntity = () => ({
    type: 'REMOVE_ACTIVE_ENTITY'
})

