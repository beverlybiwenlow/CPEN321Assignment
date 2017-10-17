import React from 'react';
import { Scene, Router, Actions, Stack, ActionConst } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import UserFeed from './components/UserFeed';
import UserProfile from './components/UserProfile';
import UserSettings from './components/UserSettings';

const RouterComponent =() => {
    return (
        <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginForm} title="Sign In to PhotoRank" />
                    <Scene key="main" tabs hideNavBar showLabel lazy>
                        <Scene
                            key="userFeed"
                            component={UserFeed}
                            title="Feed"
                        />
                        <Scene
                            key="userProfile"
                            component={UserProfile}
                            title="Profile"
                            rightTitle="Settings"
                            onRight={()=> Actions.push("userSettings")}
                            initial
                        />
                        <Scene
                            key="userSettings"
                            component={UserSettings}
                            title="Settings"
                            back
                        />
                    </Scene>
                </Scene>
        </Router>
    );
}

export default RouterComponent;
