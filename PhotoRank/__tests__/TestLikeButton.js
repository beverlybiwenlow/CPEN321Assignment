'use strict';

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, View, TextInput } from 'react-native';

import PostItem from '../src/components/PostItem';

test('Like button toggles on click', () => {
    var MockFirebase = require('firebase-mock').MockFirebase;
    const component = ReactTestRenderer.create(
        // <PostItem />
        <Text/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // const innerView = tree.children;
    // const searchBar = innerView[0].children[0];
    // searchBar.props.onFocus();
    // //tree.props.onFocus();
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});
