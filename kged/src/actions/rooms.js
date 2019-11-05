import sortBy from 'lodash/fp/sortBy'

import { fetchRooms, exportData } from 'api'
import { setActiveEntity, updateActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

// selectors

export const getRooms = (state) => {
    return sortBy('attrs.id')(state.rooms.rooms)
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
        dispatch(updateActiveRoom())
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
        dispatch(updateActiveRoom(room.attrs.id))
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

export const setActiveRoom = (room) => {
    return (dispatch) => {
        dispatch(setActiveEntity(room))
        dispatch({
            type: 'SET_ACTIVE_ROOM',
            payload: {
                room: room
            }
        })
    }
}

export const updateActiveRoom = (id = null) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ACTIVE_ROOM',
            payload: { id: id }
        })
        dispatch(updateActiveEntity({category: 'room', id: id}))
    }
}

export const saveRooms = () => {
    return (dispatch, getState) => {
        const state = getState()
        exportData(state.rooms.rooms, state.furnitures.furnitures, state.items.items, state.interactions.interactions)
        dispatch({
            type: 'EXPORT_ROOMS',
            payload: {}
        })
    }
}
