import { fetchInteractions } from 'api'
import { setActiveEntity, removeActiveEntity } from './entity'
import { isExistingEntity } from 'utils'
import { DuplicateEntityError } from 'utils/errors'
import 'styles/interactions.scss'

export const getInteractions = (state) => {
    return state.interactions.interactions
}

export const loadInteractions = () => {
    return (dispatch, getState) => {
        const interactions = fetchInteractions()
        dispatch({
            type: 'GET_INTERACTIONS',
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
        dispatch(removeActiveEntity())
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
