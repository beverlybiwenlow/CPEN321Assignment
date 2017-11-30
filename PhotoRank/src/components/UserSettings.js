import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    LoginButton,
    AccessToken
} from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Card, CardSection, Input, Button } from './common';
import { displayNameChanged, updateDisplayName, logoutUser } from '../actions';

class UserSettings extends Component {
    onDisplayNameChange(text) {
        this.props.displayNameChanged(text);
    }

    onButtonPress() {
        const { displayName } = this.props.userProfile.user;
        this.props.updateDisplayName(displayName);
    }

    onLogoutButtonPress() {
        this.props.logoutUser();
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Display Name"
                        placeholder="test@example.com"
                        onChangeText={this.onDisplayNameChange.bind(this)}
                        value= {this.props.userProfile.user.displayName}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        {this.props.userProfile.updateButtonText}
                    </Button>
                </CardSection>
                <CardSection>
                    <LoginButton
                      publishPermissions={["publish_actions"]}
                      onLoginFinished={
                        (error, result) => {
                          if (error) {
                            alert("login has error: " + result.error);
                          } else if (result.isCancelled) {
                            alert("login is cancelled.");
                          } else {
                            AccessToken.getCurrentAccessToken().then(
                              (data) => {
                              }
                            )
                          }
                        }
                      }
                      onLogoutFinished={() => Actions.reset("login")}/>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onLogoutButtonPress.bind(this)}>
                        Logout
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const userProfile = state.user;

    return { userProfile };
}

export default connect(mapStateToProps, {
    displayNameChanged, updateDisplayName, logoutUser })(UserSettings);
