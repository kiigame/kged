import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../app'

it('app is rendered with expected structure', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
})
