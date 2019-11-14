import cloneDeep from 'lodash/fp'

export const getActiveEntity = (state) => {
    let {id, category} = state.entity.activeEntity
    if (category === 'interaction') {
        return cloneDeep(Object.keys(state.interactions.interactions)).find(i => i === id)
    } else if (category === 'text') {
        return ''
    } else {

        return cloneDeep([
            ...state.rooms.rooms,
            ...state.furnitures.furnitures,
            ...state.items.items
        ]).find(e => e.attrs.id === id)
    }
}

export const getActiveEntityId = (state) => {
    return state.entity.activeEntity.id
}

export const getActiveEntityCategory = (state) => {
    return state.entity.activeEntity.category
}

export const setActiveEntity = (id, category) => ({
    type: 'SET_ACTIVE_ENTITY',
    payload: {
        id: id,
        category: category
    }
})

export const removeActiveEntity = () => ({
    type: 'REMOVE_ACTIVE_ENTITY'
})

