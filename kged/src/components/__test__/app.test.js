import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../app'

it('app is rendered', () => {
    const app = shallow(<App />);
    expect(app.find('div.app > div.row > div.pre-container').length).toEqual(1);
    // TODO expect React components?
})
