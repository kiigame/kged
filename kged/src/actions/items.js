import { sortBy } from 'lodash/fp'

import { setActiveEntity, removeActiveEntity } from './entity'
import { removeActiveRoom } from './rooms'
import { removeActiveFurniture } from './furnitures'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

export const getItems = (state) => {
    return sortBy('attrs.id')(state.items.items)
}

export const getActiveItem = (state) => {
    return state.items.items.find(i => i.attrs.id === state.items.activeItem)
}

export const loadItems = (items) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOAD_ITEMS',
            payload: {
                items: items
            }
        })
    }
}

export const setItemImage = (itemId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_ITEM_IMAGE',
            payload: {
                itemId: itemId,
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const addItem = (item) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                item: item
            }
        })
        dispatch(setActiveItem(item.name))
    }
}

export const updateItem = (oldId, item) => {
    return (dispatch, getState) => {
        if (oldId !== item.attrs.id && isExistingEntity(getState(), item.attrs.id)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                oldId: oldId,
                item: item
            }
        })
        dispatch(setActiveItem(item.attrs.id))
    }
}

export const deleteItem = (item) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: {
                item: item
            }
        })
        dispatch(removeActiveEntity())
    }
}

export const setActiveItem = (id) => {
    return (dispatch) => {
        dispatch(removeActiveRoom())
        dispatch(removeActiveFurniture())
        dispatch(setActiveEntity(id, 'item'))
        dispatch({
            type: 'SET_ACTIVE_ITEM',
            payload: {
                id: id
            }
        })
    }
}

export const removeActiveItem = () => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_ITEM',
            payload: {
                id: undefined
            }
        })
    }
}
