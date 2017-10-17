import firebase from 'firebase';

import {
    RESET_FEED,
    FETCH_USER_POSTS_SUCCESS
} from './types';

export const fetchUserPosts = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
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
    };

    export const fetchTagPosts = ({ tag }) => {
        return (dispatch) => {
            dispatch({ type: RESET_FEED });
            firebase.database().ref(`/tags/${tag}`)
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
    };

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        var topPosts = firebase.database().ref('/posts').orderByChild('likeCount').limitToFirst(50);
        topPosts.on('value', snapshots => {
            var results = snapshots.val().filter((post) => post.user !== undefined);
            dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: results});
        });
    };
};
