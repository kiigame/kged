import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import reducer from 'reducers'
import logger from 'utils/logger'
import App from 'components/app'
import 'index.css'
import 'custom.scss'

library.add(fas)

const store = createStore(reducer, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
