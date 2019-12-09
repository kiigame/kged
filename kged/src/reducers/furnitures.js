const initialState = {
    furnitures: [],
    activeFurniture: undefined
}

function furnitures(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FURNITURE':
            return {
                ...state,
                furnitures: [
                    ...state.furnitures,
                    {
                        attrs: {
                            id: action.payload.furniture.name,
                            category: 'furniture',
                            url: 'assets/placeholders/furniture.png'
                        },
                        selectedRoom: {attrs: {}},
                        selectedDestination: {attrs: {}},
                        className: 'Image'
                    }
                ]
            }
        case 'LOAD_FURNITURES':
            return {
                ...state,
                furnitures: action.payload.furnitures
            }

        case 'UPDATE_FURNITURE':
            return {
                ...state,
                furnitures: state.furnitures.map(furniture =>
                    furniture.attrs.id === action.payload.oldId
                    ? action.payload.furniture
                    : furniture
                )
            }

        case 'DELETE_FURNITURE':
            let attrs = action.payload.furniture.attrs;
            return {
                ...state,
                furnitures: state.furnitures.filter(furniture => furniture.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_FURNITURE':
            return {
                ...state,
                activeFurniture: action.payload.id
            }

        case 'SET_FURNITURE_IMAGE':
            const {furnitureId, filePath, objectUrl} = action.payload;
            return {
                ...state,
                furnitures: state.furnitures.map(furniture =>
                    furniture.attrs.id === furnitureId
                    ? { ...furniture, attrs: {...furniture.attrs, src: filePath, url: objectUrl } }
                    : furniture
                )
            }

        case 'UPDATE_ROOM':
            // TODO: simplify update logic
            return {
                ...state,
                furnitures: state.furnitures.map(furniture => {
                    if (furniture.selectedRoom &&
                        furniture.selectedRoom.attrs.id === action.payload.oldId &&
                        furniture.selectedDestination &&
                        furniture.selectedDestination.attrs.id === action.payload.oldId) {
                        return {
                            ...furniture,
                            selectedRoom: { attrs: { id: action.payload.room.attrs.id } },
                            selectedDestination: { attrs: { id: action.payload.room.attrs.id } },
                        }
                    } else if (furniture.selectedRoom &&
                        furniture.selectedRoom.attrs.id === action.payload.oldId) {
                        return {
                            ...furniture,
                            selectedRoom: { attrs: { id: action.payload.room.attrs.id } }
                        }
                    } else if (furniture.selectedDestination &&
                               furniture.selectedDestination.attrs.id === action.payload.oldId) {
                        return {
                            ...furniture,
                            selectedDestination: { attrs: { id: action.payload.room.attrs.id } }
                        }
                    } else {
                        return furniture
                    }
                })
            }

        default:
            return state
    }
}

export default furnitures
