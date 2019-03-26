// import 'react-native';
// import React from 'react';
// import App from '../App';
// import renderer from 'react-test-renderer';
// import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
// import LogInScreen from '../screens/LogInScreen';
// import Enzyme, {shallow,mount,render}from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({ adapter: new Adapter() });
//
// describe('Homepage', ()=>{
//     it('HomePage Component showing',()=>{
//         const wrapper = shallow(<LogInScreen/>);
//         expect(wrapper.exists()).toBe(true);
//     });
// });


'use strict';

const React = require('React');
const ReactTestRenderer = require('react-test-renderer');
const Text = require('Text');
const TouchableHighlight = require('TouchableHighlight');

describe('TouchableHighlight', () => {
    it('renders correctly', () => {
        const instance = ReactTestRenderer.create(
            <TouchableHighlight style={{}}>
                <Text>Touchable</Text>
            </TouchableHighlight>,
        );

        expect(instance.toJSON()).toMatchSnapshot();
    });
});