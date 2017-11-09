// Link.react-test.js
import React from 'react';
import PostItem from '../src/components/PostItem';
import ErrorBoundary from '../src/components/ErrorBoundary';
import renderer from 'react-test-renderer';


// const React = require('React');
// const ReactTestRenderer = require('react-test-renderer');
// const Text = require('Text');
// const TouchableHighlight = require('TouchableHighlight');

// describe('TouchableHighlight', () => {
//   it('renders correctly', () => {
//     const instance = ReactTestRenderer.create(
//         <PostItem/>
//         // <Text>HI</Text>
//     );
//     console.log(instance.props);
//     expect(instance.toJSON()).toMatchSnapshot();
//   });
// });

test('Like button toggles the class when clicked', () => {
  const component = renderer.create(
    // <ErrorBoundary>
        <PostItem/>
    // </ErrorBoundary>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.onButtonPress();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.onButtonPress();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});