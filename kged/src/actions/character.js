import _ from 'lodash/fp'

import { setActiveEntity } from './entity'
import { removeActiveRoom } from './rooms'
import { removeActiveFurniture } from './furnitures'
import { removeActiveItem } from './items'

// selectors

export const getCharacter = (state) => {
    const orderCharacters = _.slice(0, state.character.character.length)(state.character.character)
    const orderedCharacters = orderCharacters.sort(function (a, b) {
        return a.attrs.id.toString().localeCompare(b.attrs.id);
    } );
    return orderedCharacters
}

export const getActiveCharacter = (state) => {
    return state.character.character.find(c => c.attrs.id === state.character.activeCharacter)
}

// actions

export const loadCharacter = (character) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOAD_CHARACTER',
            payload: {
                character: character
            }
        })
    }
}

export const setIdleImage1 = (characterId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_IDLE_IMAGE1',
            payload: {
                characterId: characterId,
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const setIdleImage2 = (characterId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_IDLE_IMAGE2',
            payload: {
                characterId: 'character_idle_2',
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const setSpeakImage1 = (characterId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_SPEAK_IMAGE1',
            payload: {
                characterId: 'character_speak_1',
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const setSpeakImage2 = (characterId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_SPEAK_IMAGE2',
            payload: {
                characterId: 'character_speak_2',
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
    }
}

export const setCharacterAnimation = (character) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_ANIMATION',
            payload: {
                character: character
            }
        })
    }
}

export const addCharacter = (character) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_CHARACTER',
            payload: {
                character: character
            }
        })
        dispatch(setActiveCharacter(character.name))
    }
}

export const setActiveCharacter = (id) => {
    return (dispatch) => {
        dispatch(removeActiveRoom())
        dispatch(removeActiveFurniture())
        dispatch(removeActiveItem())
        dispatch(setActiveEntity(id, 'character'))
        dispatch({
            type: 'SET_ACTIVE_CHARACTER',
            payload: {
                id: id
            }
        })
    }
}

export const removeActiveCharacter = () => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_CHARACTER',
            payload: {
                id: undefined
            }
        })
    }
}
