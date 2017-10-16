import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import UserFeed from './components/UserFeed';
import UserProfile from './components/UserProfile';
import TabIcon from './components/common';

const RouterComponent =() => {
    return (
        <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginForm} title="Sign In to PhotoRank" />
                    <Scene key="main" tabs hideNavBar showLabel>
                        <Scene
                            key="userFeed"
                            component={UserFeed}
                            title="Feed"
                            icon={TabIcon}
                            tabStyle={styles.tabStyle}
                        />
                        <Scene
                            key="userProfile"
                            component={UserProfile}
                            title="Profile"
                            tabStyle={styles.tabStyle}
                            initial
                        />
                    </Scene>
                </Scene>
        </Router>
    );
}

const styles = {
    tabStyle: {
        fontSize: 30
    }
};

export default RouterComponent;
