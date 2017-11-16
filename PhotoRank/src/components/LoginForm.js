import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Linking, Platform } from 'react-native';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FBLoginView from './FBLoginView';
// import FireAuth from 'react-native-firebase-auth';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import SafariView from 'react-native-safari-view';
//import SpecialLogin from './SpecialLogin';

var LoginBehavior = {
    'ios': FBLoginManager.LoginBehaviors.Browser,
    'android': FBLoginManager.LoginBehaviors.Native
  }

class LoginForm extends Component {

    // constructor(props) {
    //     super(props);
    //     FireAuth.init({iosClientId: 612732847233-hoko4th3g6cd9vkjrsro3u8ugfqe5077.apps.googleusercontent.com});
    //   }

    //   componentDidMount() {
    //     FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError);
    //   }
      
    //   register = () => {
    //     const { email, password, firstName, lastName } = this.state;
    //     FireAuth.register(email, password, { firstName, lastName });
    //   }
      
    //   login = () => {
    //     FireAuth.login(this.state.email, this.state.password);
    //   }
      
    //   loginAnonymously = () => {
    //     FireAuth.loginAnonymously();
    //   }
      
    //   facebookLogin() {
    //     FireAuth.facebookLogin();
    //   }
      
    //   googleLogin() {
    //     FireAuth.googleLogin();
    //   }
      
    //   logout() {
    //     FireAuth.logout();
    //   }
      
    //   update () {
    //     FireAuth.update({
    //       firstName: this.state.firstName,
    //       lastName: this.state.lastName
    //     }).then(() => {
          
    //     }).catch(err => {
          
    //     });
    //   }
      
    //   resetPassword () {
    //     FireAuth.resetPassword(this.state.email)
    //       .then(() => {
            
    //       })
    //       .catch(err => {
            
    //       });
    //   }
      
    //   updatePassword () {
    //     FireAuth.updatePassword(this.state.password)
    //       .then(() => {
            
    //       })
    //       .catch(err => {
            
    //       });
    //   }
      

    // state = {
    //     user: undefined, // user has not logged in yet
    //   };

      
   


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
            

        
        <FBLogin
    buttonView={<FBLoginView />}
    ref={(fbLogin) => { this.fbLogin = fbLogin }}
    loginBehavior={LoginBehavior[Platform.OS]}
    permissions={["email","user_friends"]}
    onLogin={function(e){console.log(e)}}
    onLoginFound={function(e){console.log(e)}}
    onLoginNotFound={function(e){console.log(e)}}
    onLogout={function(e){console.log(e)}}
    onCancel={function(e){console.log(e)}}
    onPermissionsMissing={function(e){console.log(e)}}
  />


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
