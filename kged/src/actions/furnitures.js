import {sortBy } from 'lodash/fp'

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

export const loadFurnitures = (furnitures) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOAD_FURNITURES',
            payload: {
                furnitures: furnitures
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

export const addFurniture = (furniture) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_FURNITURE',
            payload: {
                furniture: furniture
            }
        })
        dispatch(setActiveFurniture(furniture.name))
    }
}

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
        dispatch(setActiveEntity(id, 'furniture'))
        dispatch({
            type: 'SET_ACTIVE_FURNITURE',
            payload: {
                id: id
            }
        })
    }
}
