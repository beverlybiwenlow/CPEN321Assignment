import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Linking, Platform } from 'react-native';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import SafariView from 'react-native-safari-view';
//import SpecialLogin from './SpecialLogin';

class LoginForm extends Component {


    state = {
        user: undefined, // user has not logged in yet
      };
    
      // Set up Linking
      componentDidMount() {
        // Add event listener to handle OAuthLogin:// URLs
        Linking.addEventListener('url', this.handleOpenURL);
        // Launched from an external URL
        Linking.getInitialURL().then((url) => {
          if (url) {
            this.handleOpenURL({ url });
          }
        });
      };
    
      componentWillUnmount() {
        // Remove event listener
        Linking.removeEventListener('url', this.handleOpenURL);
      };
    
      handleOpenURL = ({ url }) => {
        // Extract stringified user string out of the URL
        const [, user_string] = url.match(/user=([^#]+)/);
        this.setState({
          // Decode the user string and parse it into JSON
          user: JSON.parse(decodeURI(user_string))
        });
        if (Platform.OS === 'ios') {
          SafariView.dismiss();
        }
      };
    
      // Handle Login with Facebook button tap
      loginWithFacebook = () => this.openURL('http://localhost:3000/auth/facebook');
    
      // Handle Login with Google button tap
      loginWithGoogle = () => this.openURL('http://localhost:3000/auth/google');
    
      // Open URL in a browser
      openURL = (url) => {
        // Use SafariView on iOS
        if (Platform.OS === 'ios') {
          SafariView.show({
            url: url,
            fromBottom: true,
          });
        }
        // Or Linking.openURL on Android
        else {
          Linking.openURL(url);
        }
      };
    


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
        <View>
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
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
            <View style={styles.buttons}>
          <Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Facebook Login
          </Button>
          <Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Google Login
          </Button>
        </View>
        </View>
        );
    }
}

const iconStyles = {
    borderRadius: 10,
    iconStyle: { paddingVertical: 5 },
  };
  

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    buttons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 20,
        marginBottom: 30,
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
    emailChanged, passwordChanged, loginUser
 })(LoginForm);
