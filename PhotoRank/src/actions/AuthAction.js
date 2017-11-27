import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { EMAIL_CHANGED,
               PASSWORD_CHANGED,
               LOGIN_USER_SUCCESS,
               LOGIN_USER_FAIL,
               LOGIN_USER } from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};

export const loginWithFacebook = (accessTokenData) => {
    return (dispatch) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData);
        firebase.auth().signInWithCredential(credential).then(function(user) {
            updateDatabase(user.displayName, user.photoURL);
            loginUserSuccess(dispatch, user);
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const checkInitialAuth = () => {
    return (dispatch) => {
        const user = firebase.auth().currentUser;
        if (user) {
            loginUserSuccess(dispatch, user);
        }
    }
}

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user});

    Actions.reset("main");
    Actions.push("userProfile");
};

const updateDatabase = (displayName, photoURL) => {
    const { currentUser } = firebase.auth();
    updates = {};
    updates[`/users/${currentUser.uid}/displayName`] = displayName;
    updates[`/users/${currentUser.uid}/photoURL`] = photoURL;
    return firebase.database().ref().update(updates);
}
