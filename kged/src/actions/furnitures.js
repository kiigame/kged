import { fetchFurnitures } from 'api'
import { setActiveEntity } from './entity'

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

export const updateFurniture = (furniture) => ({
    type: 'UPDATE_FURNITURE',
    payload: {
        furniture: furniture
    }
})

export const deleteFurniture = (furniture) => ({
    type: 'DELETE_FURNITURE',
    payload: {
        furniture: furniture
    }
})

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
