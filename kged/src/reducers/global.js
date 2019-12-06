const initialState = {
    events: []
}

function global(state = initialState, action) {
    switch (action.type) {
        case 'GLOBAL_ERROR':
            return {
                ...state,
                events: [
                    ...state.events,
                    {
                        type: 'ERROR',
                        message: action.payload.message,
                        data: action.payload.error
                    }
                ]
            }

        default:
            return state
    }
}

export default global
