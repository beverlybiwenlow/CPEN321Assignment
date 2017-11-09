'use strict';

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, View, TextInput } from 'react-native';

import PostItem from '../src/components/PostItem';

test('post item', () => {
    const component = ReactTestRenderer.create(
        <PostItem />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
