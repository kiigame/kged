const initialState = {
    rooms: require('data/rooms.json')['rooms'],
    activeRoom: {}
}

function rooms(state = initialState, action) {
    let attrs;

    switch (action.type) {
        case 'ADD_ROOM':
            return {
                ...state,
                rooms: [
                    ...state.rooms,
                    {
                        attrs: {
                            id: action.payload.room.name,
                            category: 'room'
                        }
                    }
                ]
            }

        case 'UPDATE_ROOM':
            attrs = action.payload.room.attrs;
            return {
                ...state,
                rooms: state.rooms.map(room =>
                    room.attrs.id === attrs.id
                    ? { ...room, attrs }
                    : room
                )
            }

        case 'DELETE_ROOM':
            attrs = action.payload.room.attrs;
            return {
                ...state,
                rooms: state.rooms.filter(room => room.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_ROOM':
            return {
                ...state,
                activeRoom: action.payload.room
            }

        default:
            return state
    }
}

export default rooms
