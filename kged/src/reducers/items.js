import { fetchItems } from 'api'

const initialState = {
    items: fetchItems(),
    activeItem: {}
}
function items(state = initialState, action) {
    let attrs;

    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        attrs: {
                            id: action.payload.item.name,
                            category: 'item',
                            url: 'assets/placeholders/item.jpg',
                            visible: false
                        },
                        className: 'Image'
                    }
                ]
            }

        case 'UPDATE_ITEM_ID':
            return {
                ...state,
                items: state.items.map(item =>
                    item.attrs.id === action.payload.oldId
                    ? { ...item, attrs: { ...item.attrs, id: action.payload.newId }
                    }
                    : item
                )
            }

        case 'SET_ITEM_BACKGROUND_IMAGE':
            const id = action.payload.itemId
            const src = action.payload.filePath
            const objUrl = action.payload.objectUrl

            const newBg = {
                category: 'item',
                id: src,
                src: `images/${src}`,
                visible: false,
                url: objUrl
            }
            const hasBg = item => (
                item && item.some(c =>
                    c.attrs && c.attrs.category === 'item'
                )
            )

            // TODO: refactor this to use helper functions (for clarity)
            return {
                ...state,
                items: state.items.map(item =>
                    item.attrs.id === id
                    ? { ...item, children: hasBg(item)
                        // patch item_background attrs if it already exists
                        ? item.children.map(c =>
                            c.attrs.category === 'item_background'
                            ? { ...c, attrs: newBg}
                            : c
                        )
                        // otherwise create a new object under children
                        : [...(item.children || []), { attrs: newBg, className: 'Image' }]
                    }
                    : item
                )
            }

        case 'DELETE_ITEM':
            attrs = action.payload.item.attrs;
            return {
                ...state,
                items: state.items.filter(item => item.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_ITEM':
            return {
                ...state,
                activeItem: action.payload.item
            }

        case 'UPDATE_ACTIVE_ITEM':
            const itemId = action.payload.id || state.activeItem.attrs.id
            return {
                ...state,
                activeItem: state.items.find(r =>
                    r.attrs.id === itemId
                )
            }

        default:
            return state
    }
}

export default items
