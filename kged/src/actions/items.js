import { fetchItems } from 'api'
import { setActiveEntity, updateActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

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

export const updateItem = (oldId, newId) => {
    return (dispatch, getState) => {
        if (oldId !== newId && isExistingEntity(getState(), newId)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                oldId: oldId,
                newId: newId
            }
        })
        dispatch(updateActiveItem(newId))
    }
}

export const deleteItem = (item) => ({
    type: 'DELETE_ITEM',
    payload: {
        item: item
    }
})

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
