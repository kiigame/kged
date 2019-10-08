// action creators

import { fetchRooms, exportRooms } from 'api'

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

export const setActiveRoom = (room) => ({
    type: 'SET_ACTIVE_ROOM',
    payload: {
        room: room
    }
})

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
