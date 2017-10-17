import firebase from 'firebase';

import {
    FETCH_USER_POST,
    FETCH_USER_POSTS_SUCCESS
} from './types';

export const fetchUserPosts = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: FETCH_USER_POST });
        firebase.database().ref(`/userPosts/${currentUser.uid}`)
            .on('value', snapshots => {
                var promises = [];
                var posts = {};
                snapshots.forEach((key) => {
                    promises.push(
                        firebase.database().ref(`/posts/${key.key}`).once('value')
                    );
                });
                Promise.all(promises).then((snapshots) => {
                    snapshots.forEach((snapshot) => {
                        posts[snapshot.key] = snapshot.val();
                    });
                    dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: posts});
                });
            });
        };
    }