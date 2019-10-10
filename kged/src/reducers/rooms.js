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

        case 'SET_ROOM_BACKGROUND_IMAGE':
            let id = action.payload.roomId
            let src = action.payload.filePath
            return {
                ...state,
                rooms: state.rooms.map(room =>
                    room.attrs.id === id
                    ? { ...room, children: room.children.map(c =>
                        c.attrs.category === 'room_background'
                        ? { ...c, attrs: {
                            category: 'room_background',
                            width: 981,
                            height: 543,
                            id: src,
                            src: `images/${src}`,
                            visible: true
                        }}
                        : c
                    )}
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

        case 'SET_ROOM_BACKGROUND_IMG':
            console.log('action',action)
            return {
                ...state,
                img: action.payload.img
            }

        default:
            return state
    }
}

export default rooms
