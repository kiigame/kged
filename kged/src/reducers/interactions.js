import { fetchInteractions } from 'api'

const initialState = {
    interactions: fetchInteractions(),
    activeInteraction: {}
}

function interactions(state = initialState, action) {
    let attrs;

    switch (action.type) {
        case 'ADD_INTERACTION':
            return {
                ...state,
                interactions: [
                    ...state.interactions,
                    {
                        attrs: {
                            id: action.payload.interaction.name,
                            category: 'interaction',
                        }
                    }
                ]
            }

        case 'UPDATE_INTERACTION':
            return {
                ...state,
                interactions: state.interactions.map(interaction =>
                    interaction.attrs.id === action.payload.oldId
                    ? { ...interaction, attrs: {
                        ...interaction.attrs,
                        id: action.payload.newId,
                        containerRoom: action.payload.containerRoom,
                        xValue: action.payload.xValue,
                        yValue: action.payload.yValue }
                    }
                    : interaction
                )
            }

        case 'DELETE_INTERACTION':
            attrs = action.payload.interaction.attrs;
            return {
                ...state,
                interactions: state.interactions.filter(interaction => interaction.attrs.id !== attrs.id)
            }

        case 'SET_ACTIVE_INTERACTION':
            return {
                ...state,
                activeInteraction: action.payload.interaction
            }

        case 'UPDATE_ACTIVE_INTERACTION':
            const fid = action.payload.id || state.activeInteraction.attrs.id
            return {
                ...state,
                activeInteraction: state.interactions.find(r =>
                    r.attrs.id === fid
                )
            }

        default:
            return state
    }
}

export default interactions
