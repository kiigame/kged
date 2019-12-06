const initialState = {
    errors: []
}

function global(state = initialState, action) {
    switch (action.type) {
        case 'GLOBAL_ERROR':
            console.log('GLOBAL_ERROR')
            return {
                ...state,
                errors: [
                    ...state.errors,
                    action.payload
                ]
            }

        default:
            return state
    }
}

export default global
