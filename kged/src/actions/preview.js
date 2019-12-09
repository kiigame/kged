export const startGame = (event) => {
    return (dispatch, getState) => {
        let state = getState()
        if (state.preview.isEngineRunning) {
            console.log('engine is already running')
        } else {
            dispatch({
                type: 'START_GAME',
                payload: {}
            })
            dispatch({
                type: 'LOG_INFO',
                payload: {
                    type: 'INFO',
                    message: 'Peli käynnistetty'
                }
            })
        }
    }
}

export const stopGame = (event) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'STOP_GAME',
            payload: {}
        })
        dispatch({
            type: 'LOG_INFO',
            payload: {
                type: 'INFO',
                message: 'Peli pysäytetty'
            }
        })
    }
}
