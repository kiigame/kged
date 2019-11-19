const initialState = {
    rooms: [],
    activeRoom: undefined
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
                            category: 'room',
                            visible: false
                        },
                        children: [
                            {attrs: {
                                category: 'room_background',
                                width: 981,
                                height: 543,
                                id: 'room_placeholder',
                                url: 'assets/placeholders/room.png',
                                visible: true
                            }}
                        ],
                        className: 'Layer'
                    }
                ]
            }

        case 'LOAD_ROOMS':
            return {
                ...state,
                rooms: action.payload.rooms
            }

        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room =>
                    room.attrs.id === action.payload.oldId
                    ? action.payload.room
                    : room
                )
            }

        case 'SET_ROOM_BACKGROUND_IMAGE':
            const id = action.payload.roomId
            const src = action.payload.filePath
            const objUrl = action.payload.objectUrl

            const newBg = {
                category: 'room_background',
                width: 981,
                height: 543,
                id: src,
                src: `images/${src}`,
                visible: true,
                url: objUrl
            }
            const hasBg = room => (
                room.children && room.children.some(c =>
                    c.attrs && c.attrs.category === 'room_background'
                )
            )

            // TODO: refactor this to use helper functions (for clarity)
            return {
                ...state,
                rooms: state.rooms.map(room =>
                    room.attrs.id === id
                    ? { ...room, children: hasBg(room)
                        // patch room_background attrs if it already exists
                        ? room.children.map(c =>
                            c.attrs.category === 'room_background'
                            ? { ...c, attrs: newBg}
                            : c
                        )
                        // otherwise create a new object under children
                        : [...(room.children || []), { attrs: newBg, className: 'Image' }]
                    }
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
                activeRoom: action.payload.id
            }

        default:
            return state
    }
}

export default rooms
