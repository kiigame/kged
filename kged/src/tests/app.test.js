import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

import App from '../components/app'
import Rooms from '../components/rooms'
import {myActions} from '../actions'

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

describe('Room component', () => {
  let store;
  let component;

  beforeEach(() =>{
    store = mockStore({
      rooms: {
        rooms: [],
        activeRoom: {}
      }
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Rooms />
      </Provider>
    );
  });

it('should dispatch an action on button click', () => {
  renderer.act(() => {
    component.root.findByType('button').props.onClick();
  });

  expect(store.dispatch).toHaveBeenCalledTimes(1);

});
});

