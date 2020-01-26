import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../app'

it('app is rendered with expected structure', () => {
    const app = shallow(<App />);
    expect(app.find('div.app > div.row > div.pre-container').length).toEqual(1);
    expect(app.find('Sidebar').length).toEqual(1);
    expect(app.find('div.pre-container > Connect(ActionBar)').length).toEqual(1);
    expect(app.find('div.pre-container > Connect(Preview)').length).toEqual(1);
    expect(app.find('div.pre-container > Connect(Console)').length).toEqual(1);
    expect(app.find('Connect(Inspector)').length).toEqual(1);
})
