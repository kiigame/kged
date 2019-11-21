import { KiiGame } from '@kiigame/adventure_engine'
import { JSONGetter } from 'utils/json_getter'

const initialState = {
    isEngineRunning: false,
    engine: undefined
}

function preview(state = initialState, action, globalState) {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                engine: new KiiGame(new JSONGetter(globalState)),
                isEngineRunning: true
            }

        case 'STOP_GAME':
            return {
                ...state,
                engine: undefined,
                isEngineRunning: false
            }

        default:
            return state
    }
}

export default preview
