import { fetchTexts } from 'api'

const initialState = {
    texts: fetchTexts(),
    activeText: undefined
}

function texts(state = initialState, action) {
    let attrs;

    switch (action.type) {
        case 'ADD_TEXT':
            return {
                ...state,
                texts: [
                    ...state.texts,
                    {
                        attrs: {
                            id: action.payload.text.name,
                            category: 'text',
                        }
                    }
                ]
            }

        case 'UPDATE_TEXT':
            return {
                ...state,
                texts: state.texts.map(text =>
                    text.attrs.id === action.payload.oldId
                    ? action.payload.text
                    : text
                )
            }

        case 'DELETE_TEXT':
            attrs = action.payload.text.attrs;
            return {
                ...state,
                texts: state.texts.filter(text => text.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_TEXT':
            return {
                ...state,
                activeText: action.payload.id
            }

        default:
            return state
    }
}

export default texts
