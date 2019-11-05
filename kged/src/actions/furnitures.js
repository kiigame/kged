import sortBy from 'lodash/fp/sortBy'

import { fetchFurnitures } from 'api'
import { setActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

// selectors

export const getFurnitures = (state) => {
    return sortBy('attrs.id')(state.furnitures.furnitures)
}

export const getActiveFurniture = (state) => {
    return state.furnitures.furnitures.find(f =>
        f.attrs.id === state.furnitures.activeFurniture)
}


// actions

export const loadFurnitures = () => {
    return (dispatch, getState) => {
        const furnitures = fetchFurnitures()
        dispatch({
            type: 'GET_FURNITURES',
            payload: {
                furnitures
            }
        })
    }
}

export const setFurnitureImage = (furnitureId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_FURNITURE_IMAGE',
            payload: {
                furnitureId: furnitureId,
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const addFurniture = (furniture) => ({
    type: 'ADD_FURNITURE',
    payload: {
        furniture: furniture
    }
})

export const updateFurniture = (oldId, furniture) => {
    return (dispatch, getState) => {
        if (oldId !== furniture.attrs.id && isExistingEntity(getState(), furniture.attrs.id)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_FURNITURE',
            payload: {
                oldId: oldId,
                furniture: furniture
            }
        })
        dispatch(setActiveFurniture(furniture.attrs.id))
    }
}

export const deleteFurniture = (furniture) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_FURNITURE',
            payload: {
                furniture: furniture
            }
        })
        dispatch(removeActiveEntity())
    }
}

export const setActiveFurniture = (id) => {
    return (dispatch) => {
        dispatch(setActiveEntity(id))
        dispatch({
            type: 'SET_ACTIVE_FURNITURE',
            payload: {
                id: id
            }
        })
    }
}
