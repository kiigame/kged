import _ from 'lodash/fp';

import { setActiveEntity, removeActiveEntity } from './entity'
import { removeActiveItem } from './items'
import { removeActiveFurniture } from './furnitures'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

// selectors

export const getRooms = (state) => {
    const rooms = _.slice(0, state.rooms.rooms.length)(state.rooms.rooms)
    const orderedRooms = rooms.sort(function (a, b) {
        return a.attrs.id.toString().localeCompare(b.attrs.id);
    } );
    return orderedRooms
}

export const getActiveRoom = (state) => {
    return state.rooms.rooms.find(r => r.attrs.id === state.rooms.activeRoom)
}

export const hasStartRoom = (state) => {
    return state.rooms.rooms.find(r => r.attrs.start === true)
}


// actions

export const loadRooms = (rooms) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOAD_ROOMS',
            payload: {
                rooms: rooms
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
        dispatch(setActiveRoom(room.name))
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
        dispatch(removeActiveItem())
        dispatch(removeActiveFurniture())
        dispatch(setActiveEntity(id, 'room'))
        dispatch({
            type: 'SET_ACTIVE_ROOM',
            payload: {
                id: id
            }
        })
    }
}

export const removeActiveRoom = () => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_ROOM',
            payload: {
                id: undefined
            }
        })
    }
}
