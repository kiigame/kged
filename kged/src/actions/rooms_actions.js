import dispatcher from '../dispatcher'

export const ROOMS_ACTIONS = {
    CHANGE_ROOM: 'roomsActions.ChangeRoom'
}

export function changeRoom (room,index) {
    const room_object = {'name': room, 'id': index}
    dispatcher.dispatch({
        type: ROOMS_ACTIONS.CHANGE_ROOM,
        value: room_object
    })
}
