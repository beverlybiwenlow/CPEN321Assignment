import firebase from 'firebase';

import {
    CREATE_PROFILE_SUCCESS,
    FETCH_PROFILE_SUCCESS,
    DISPLAY_NAME_CHANGED,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_BUTTON_REVERT
} from './types';

export const createProfile = ({ displayName }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}`)
            .set({
            displayName
        }).then(() => {
            console.log('profile created!');
            dispatch({ type: CREATE_PROFILE_SUCCESS });
        });
    };
};

export const fetchProfile = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', snapshot => {
                if (snapshot.val().displayName === null) {
                    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: {...snapshot.val(), displayName : 'Anonymous'}});
                } else {
                    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: snapshot.val() });
                }
            });
    };
};

export const displayNameChanged = (text) => {
    return {
        type: DISPLAY_NAME_CHANGED,
        payload: text
    }
}

export const updateDisplayName = (displayName) => {
    return (dispatch) => {
        updateDisplayNameDatabase(displayName);
        dispatch({ type: UPDATE_PROFILE_SUCCESS });
        setTimeout(function() {
            dispatch({ type: UPDATE_BUTTON_REVERT});
        }, 2000);
    }
}

const updateDisplayNameDatabase = (displayName) => {
    const { currentUser } = firebase.auth();
    updates = {};
    updates[`/users/${currentUser.uid}/displayName`] = displayName;
    return firebase.database().ref().update(updates);
}
