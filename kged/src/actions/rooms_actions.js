import dispatcher from '../dispatcher'

export const ROOMS_ACTIONS = {
    SET_ROOMS: 'roomsActions.SetRooms',
    CHANGE_ROOM: 'roomsActions.ChangeRoom',
    UPDATE_ROOM: 'roomsActions.UpdateRoom'
}

export function setRooms (rooms) {
    dispatcher.dispatch({
        type: ROOMS_ACTIONS.SET_ROOMS,
        value: rooms
    })
}

export function changeRoom (room,index) {
    const room_object = {'name': room, 'id': index}
    dispatcher.dispatch({
        type: ROOMS_ACTIONS.CHANGE_ROOM,
        value: room_object
    })
}

export function updateRoom (id, name) {
    const room_object = {'name': name, 'id': id}
    dispatcher.dispatch({
        type: ROOMS_ACTIONS.UPDATE_ROOM,
        value: room_object
    })
}
