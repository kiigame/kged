import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import App from '../components/app'
import Rooms from '../components/rooms'

const mockStore = configureStore([])

describe('Rooms', () => {
  let store;
  let component;

  beforeEach(() =>{
    store = mockStore({
      myState: 'test',
    });

    component = renderer.create(
      <Provider store={store}>
        <Rooms />
      </Provider>
    );
  });

  it('should render with given state', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});



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
