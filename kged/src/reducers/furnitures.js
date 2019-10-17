const initialState = {
    furnitures: require('data/items.json'),
    activeFurniture: {}
}

function furnitures(state = initialState, action) {
    let attrs;

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
                            src: 'assets/placeholders/furniture.jpg'
                        }
                    }
                ]
            }

        case 'UPDATE_FURNITURE':
            attrs = action.payload.furniture.attrs;
            return {
                ...state,
                furnitures: state.furnitures.map(furniture =>
                    furniture.attrs.id === attrs.id
                    ? { ...furniture, attrs }
                    : furniture
                )
            }

        case 'DELETE_FURNITURE':
            attrs = action.payload.furniture.attrs;
            return {
                ...state,
                furnitures: state.furnitures.filter(furniture => furniture.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_FURNITURE':
            return {
                ...state,
                activeFurniture: action.payload.furniture
            }

        default:
            return state
    }
}

export default furnitures
