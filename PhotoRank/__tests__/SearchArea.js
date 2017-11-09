'use strict';

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, View, TextInput } from 'react-native';

import SearchArea from '../src/components/SearchArea';

test('show types when button is search bar is clicked', () => {
    const component = ReactTestRenderer.create(
        <SearchArea />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const innerView = tree.children;
    const searchBar = innerView[0].children[0];
    searchBar.props.onFocus();
    //tree.props.onFocus();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
