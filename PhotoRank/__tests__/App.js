import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import ReactTestRenderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = ReactTestRenderer.create(
    <App />
  );
});
