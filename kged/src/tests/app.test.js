import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import App from '../components/app'

const mockStore = configureStore([])

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = mockStore({
      rooms: {
          rooms: [],
          activeRoom: {}
      }
  })

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div)
  ReactDOM.unmountComponentAtNode(div)
})
