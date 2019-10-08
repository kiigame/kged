// action creators

import { fetchRooms, exportRooms, fetchFurnitures } from 'api'

export const setActiveEntity = (entity) => ({
    type: 'SET_ACTIVE_ENTITY',
    payload: {
        entity: entity
    }
})

// thunk
export function loadRooms() {
    return function(dispatch, getState) {
        const rooms = fetchRooms()
        dispatch({
            type: 'GET_ROOMS',
            payload: {
                rooms
            }
        })
    }
}

export const addRoom = (room) => ({
    type: 'ADD_ROOM',
    payload: {
        room: room
    }
})

export const updateRoom = (room) => ({
    type: 'UPDATE_ROOM',
    payload: {
        room: room
    }
})

export const deleteRoom = (room) => ({
    type: 'DELETE_ROOM',
    payload: {
        room: room
    }
})

export function setActiveRoom(room) {
    return function(dispatch) {
        dispatch(setActiveEntity(room))
        dispatch({
            type: 'SET_ACTIVE_ROOM',
            payload: {
                room: room
            }
        })
    }
}

export function saveRooms() {
    return function(dispatch, getState) {
        const state = getState()
        exportRooms(state.rooms.rooms)
        dispatch({
            type: 'EXPORT_ROOMS',
            payload: {}
        })
    }
}




export function loadFurnitures() {
    return function(dispatch, getState) {
        const furnitures = fetchFurnitures()
        dispatch({
            type: 'GET_FURNITURES',
            payload: {
                furnitures
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

export function setActiveFurniture(furniture) {
    return function(dispatch) {
        dispatch(setActiveEntity(furniture))
        dispatch({
            type: 'SET_ACTIVE_FURNITURE',
            payload: {
                furniture: furniture
            }
        })
    }
}

