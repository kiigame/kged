import sortBy from 'lodash/fp/sortBy'

import { fetchItems } from 'api'
import { setActiveEntity, updateActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

export const getItems = (state) => {
    return sortBy('attrs.id')(state.items.items)
}

export const loadItems = () => {
    return (dispatch, getState) => {
        const items = fetchItems()
        dispatch({
            type: 'GET_ITEMS',
            payload: {
                items
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
        dispatch(updateActiveItem())
    }
}

export const addItem = (item) => ({
    type: 'ADD_ITEM',
    payload: {
        item: item
    }
})

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
        dispatch(updateActiveItem(item.attrs.id))
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

export const setActiveItem = (item) => {
    return (dispatch) => {
        dispatch(setActiveEntity(item))
        dispatch({
            type: 'SET_ACTIVE_ITEM',
            payload: {
                item: item
            }
        })
    }
}

export const updateActiveItem = (id = null) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ACTIVE_ITEM',
            payload: { id: id }
        })
        dispatch(updateActiveEntity({category: 'item', id: id}))
    }
}
