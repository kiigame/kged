const initialState = {
    gameName: 'Pelidata.zip',
    events: []
}

function formatTimestamp(d) {
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

function global(state = initialState, action) {
    switch (action.type) {
        case 'LOG_ERROR':
            return {
                ...state,
                events: [
                    ...state.events,
                    {
                        type: 'ERROR',
                        message: action.payload.message,
                        timestamp: formatTimestamp(new Date()),
                        data: action.payload.error
                    }
                ]
            }

        case 'LOG_INFO':
            return {
                ...state,
                events: [
                    ...state.events,
                    {
                        type: 'INFO',
                        message: action.payload.message,
                        timestamp: formatTimestamp(new Date()),
                        data: action.payload.data
                    }
                ]
            }

        case 'CLEAR_EVENTS':
            return {
                ...state,
                events: []
            }
        case 'CHANGE_GAME_NAME':
            return {
                ...state,
                gameName: action.name
            }

        default:
            return state
    }
}

export default global
