import { fetchTexts } from 'api'
import { setActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'

// selectors

export const getTexts = (state) => {
    return Object.keys(state.texts.texts).sort()
}

export const getActiveText = (state) => {
    console.log('getactivetext state',state)
    return Object.keys(state.texts.texts).find(r => r === state.texts.activeText)
}


// actions

export const loadTexts = () => {
    return (dispatch, getState) => {
        const texts = fetchTexts()
        dispatch({
            type: 'GET_TEXTS',
            payload: {
                texts
            }
        })
    }
}

export const addText = (text) => {
    return (dispatch, getState) => {
        if (isExistingEntity(getState(), text.name)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'ADD_TEXT',
            payload: {
                text: text
            }
        })
    }
}

export const updateText = (oldId, text) => {
    return (dispatch, getState) => {
        if (oldId !== text.attrs.id && isExistingEntity(getState(), text.attrs.id)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_TEXT',
            payload: {
                oldId: oldId,
                text: text
            }
        })
        dispatch(setActiveText(text.attrs.id))
    }
}

export const deleteText = (text) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_TEXT',
            payload: {
                text: text
            }
        })
        dispatch(removeActiveEntity())
    }
}

export const setActiveText = (id) => {
    return (dispatch) => {
        dispatch(setActiveEntity(id, 'text'))
        dispatch({
            type: 'SET_ACTIVE_TEXT',
            payload: {
                id: id
            }
        })
    }
}
