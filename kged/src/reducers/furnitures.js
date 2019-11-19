// import { fetchFurnitures } from 'api'

const initialState = {
    furnitures: [],
    activeFurniture: undefined
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
            attrs = action.payload.furniture.attrs;
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
                furnitures: state.furnitures.map(furn =>
                    furn.attrs.id === furnitureId
                    ? { ...furn, attrs: {...furn.attrs, src: filePath, url: objectUrl } }
                    : furn
                )
            }

        default:
            return state
    }
}

export default furnitures
