import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {
    componentWillMount() {
        var config = {
              apiKey: "AIzaSyCc0r18pWi0kIgyPvxp3dopfl-MJS1Z2ZM",
              authDomain: "photorank-5eb33.firebaseapp.com",
              databaseURL: "https://photorank-5eb33.firebaseio.com",
              projectId: "photorank-5eb33",
              storageBucket: "photorank-5eb33.appspot.com",
              messagingSenderId: "627041627028"
            };
            firebase.initializeApp(config);
            const storage = firebase.storage();
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
