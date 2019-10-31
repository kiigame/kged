import { fetchFurnitures } from 'api'
import { setActiveEntity, updateActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

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
        dispatch(updateActiveFurniture())
    }
}

export const addFurniture = (furniture) => ({
    type: 'ADD_FURNITURE',
    payload: {
        furniture: furniture
    }
})

export const updateFurnitureId = (oldId, newId) => {
    return (dispatch, getState) => {
        if (isExistingEntity(getState(), newId)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_FURNITURE_ID',
            payload: {
                oldId: oldId,
                newId: newId
            }
        })
        dispatch(updateActiveFurniture(newId))
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

export const setActiveFurniture = (furniture) => {
    return (dispatch) => {
        dispatch(setActiveEntity(furniture))
        dispatch({
            type: 'SET_ACTIVE_FURNITURE',
            payload: {
                furniture: furniture
            }
        })
    }
}

export const updateActiveFurniture = (id = null) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ACTIVE_FURNITURE',
            payload: { id: id }
        })
        dispatch(updateActiveEntity({category: 'furniture', id: id}))
    }
}
