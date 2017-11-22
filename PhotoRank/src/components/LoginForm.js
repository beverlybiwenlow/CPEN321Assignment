import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {
    LoginButton,
    AccessToken
} from 'react-native-fbsdk';
import firebase from 'firebase';

import {
    emailChanged,
    passwordChanged,
    loginUser,
    loginWithFacebook } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
    componentWillMount() {
        AccessToken.getCurrentAccessToken().then((data) => {
            if (data !== null) {
                this.props.loginWithFacebook(data.accessToken.toString());
            }
        })
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password});
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="test@example.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
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
                                  this.props.loginWithFacebook(data.accessToken.toString())
                                //alert(data.accessToken.toString())
                              }
                            )
                          }
                        }
                      }
                      onLogoutFinished={() => alert("logout.")}/>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    };
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser, loginWithFacebook
 })(LoginForm);
