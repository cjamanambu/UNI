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