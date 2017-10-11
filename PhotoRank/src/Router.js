import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import UserFeed from './components/UserFeed';

const RouterComponent =() => {
    return (
        <Router>
                <Stack key="root">
                    <Scene key="login" component={LoginForm} title="Sign In to PhotoRank" />
                    <Scene
                        key="userFeed"
                        component={UserFeed}
                        title="PhotoRank"
                    />
                </Stack>
        </Router>
    );
}

export default RouterComponent;
