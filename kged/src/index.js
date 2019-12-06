import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import reducer from 'reducers'
import logger from 'utils/logger'
import globalEventHandler from 'utils/global_event_handler'
import App from 'components/app'
import 'styles/index.scss'
import 'styles/custom.scss'

// Starts the app by navigating to App-component.
// Redux store is also created here.

library.add(fas)

const store = createStore(reducer, applyMiddleware(logger, globalEventHandler, thunk))

window.onerror = (message, source, lineno, colno, error) => {
    store.dispatch({type: 'GLOBAL_ERROR', payload: { message: message, data: error }})
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
