import { omit } from 'lodash/fp'

const initialState = {
    texts: {},
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
        case 'LOAD_TEXTS':
            return {
                ...state,
                texts: action.payload.texts
            }

        case 'DELETE_TEXT':
            attrs = action.payload.text.attrs;
            return {
                ...state,
                texts: state.texts.filter(text => text.attrs.id !== attrs.id)
            }

        case 'DELETE_EXAMINE_TEXT':
            return {
                ...state,
                texts: omit(action.payload.object,state.texts)
            }

        case 'SET_ACTIVE_TEXT':
            return {
                ...state,
                activeText: action.payload.id
            }

        case 'SET_EXAMINE_TEXT':
            return {
                ...state,
                texts: {
                    ...state.texts,
                    [action.payload.object]: {
                        'examine': action.payload.examineText
                    }
                }
            }

        default:
            return state
    }
}

export default texts
