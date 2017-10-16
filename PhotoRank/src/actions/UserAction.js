import firebase from 'firebase';

import {
    CREATE_PROFILE_SUCCESS,
    FETCH_PROFILE_SUCCESS
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
                if (snapshot.val() === null) {
                    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: "Anonymous"});
                } else {
                    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: snapshot.val().displayName });
                }
            });
    };
};
