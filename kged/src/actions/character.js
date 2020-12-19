import _ from 'lodash/fp' 

import { setActiveEntity } from './entity'
import { removeActiveRoom } from './rooms'
import { removeActiveFurniture } from './furnitures'
import { removeActiveItem } from './items'

// selectors

export const getCharacter = (state) => {
    const character = _.slice(0, state.character.character.length)(state.character.character)
    const orderedCharacter = character.sort(function (a, b) {
        return a.attrs.id.toString().localeCompare(b.attrs.id);
    } );
    return orderedCharacter
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

export const setCharacterImage = (characterId, filePath, objectUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_CHARACTER_IMAGE',
            payload: {
                characterId: characterId,
                filePath: filePath,
                objectUrl: objectUrl
            }
        })
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
