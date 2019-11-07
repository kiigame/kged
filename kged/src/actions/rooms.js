import { sortBy } from 'lodash/fp'

import { fetchRooms, exportRooms, exportData } from 'api'
import { setActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

// selectors

export const getRooms = (state) => {
    return sortBy('attrs.id')(state.rooms.rooms)
}

export const getActiveRoom = (state) => {
    return state.rooms.rooms.find(r => r.attrs.id === state.rooms.activeRoom)
}


// actions

export const loadRooms = () => {
    return (dispatch, getState) => {
        const rooms = fetchRooms()
        dispatch({
            type: 'GET_ROOMS',
            payload: {
                rooms
            }
        })
    }
}

export const setRoomBackgroundImage = (roomId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_ROOM_BACKGROUND_IMAGE',
            payload: {
                roomId: roomId,
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const addRoom = (room) => {
    return (dispatch, getState) => {
        if (isExistingEntity(getState(), room.name)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'ADD_ROOM',
            payload: {
                room: room
            }
        })
    }
}

export const updateRoom = (oldId, room) => {
    return (dispatch, getState) => {
        if (oldId !== room.attrs.id && isExistingEntity(getState(), room.attrs.id)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_ROOM',
            payload: {
                oldId: oldId,
                room: room
            }
        })
        dispatch(setActiveRoom(room.attrs.id))
    }
}

export const deleteRoom = (room) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_ROOM',
            payload: {
                room: room
            }
        })
        dispatch(removeActiveEntity())
    }
}

export const setActiveRoom = (id) => {
    return (dispatch) => {
        dispatch(setActiveEntity(id))
        dispatch({
            type: 'SET_ACTIVE_ROOM',
            payload: {
                id: id
            }
        })
    }
}

export const saveRooms = () => {
    return (dispatch, getState) => {
        const state = getState()
        // exportData(state.rooms.rooms, state.furnitures.furnitures, state.items.items, state.interactions.interactions)
        console.log('EXPORT ROOMS:', exportRooms(state))
        // dispatch({
        //     type: 'EXPORT_ROOMS',
        //     payload: {}
        // })
    }
}
