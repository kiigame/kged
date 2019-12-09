import { setActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'
import 'styles/interactions.scss'

// selectors

export const getInteractions = (state) => {
    return state.interactions.interactions
}


// actions

export const loadInteractions = (interactions) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOAD_INTERACTIONS',
            payload: {
                interactions
            }
        })
    }
}

export const addInteraction = (interaction) => ({
    type: 'ADD_INTERACTION',
    payload: {
        interaction: interaction
    }
})

export const updateInteraction = (oldId, newData) => {
    return (dispatch, getState) => {
        if (oldId !== newData.name && isExistingEntity(getState(), newData.name)) {
            throw new DuplicateEntityError('Nimi on jo käytössä')
        }
        dispatch({
            type: 'UPDATE_INTERACTION',
            payload: {
                oldId: oldId,
                newId: newData.name,
                source: newData.source,
                destination: newData.destination,
                interactionType: newData.interactionType,
                command: newData.command
            }
        })
    }
}

export const deleteInteraction = (interaction) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_INTERACTION',
            payload: {
                interaction: interaction
            }
        })
    }
}

export const setActiveInteraction = (interaction) => {
    return (dispatch) => {
        dispatch(setActiveEntity(interaction, 'interaction'))
        dispatch({
            type: 'SET_ACTIVE_INTERACTION',
            payload: {
                interaction: interaction
            }
        })
    }
}

export const setDoorInteraction = (id, destination) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_DOOR_INTERACTION',
            payload: {
                interaction: id,
                destination: destination.attrs.id
            }
        })
    }
}

export const setExamineInteraction = (id, examineText) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_EXAMINE_INTERACTION',
            payload: {
                interaction: id
            }
        })
        dispatch({
            type: 'SET_EXAMINE_TEXT',
            payload: {
                object: id,
                examineText: examineText
            }
        })
    }
}

