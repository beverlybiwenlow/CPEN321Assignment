import firebase from 'firebase';

import {
    RESET_FEED,
    FETCH_USER_POSTS_SUCCESS
} from './types';

export const fetchUserPosts = ({ uid}) => {
    // const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        firebase.database().ref(`/userPosts/${uid}`)
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

export const fetchLocationPosts = ({ location }) => {
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        firebase.database().ref(`/locationFeature/${location.toLowerCase()}`)
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
            Object.filter = (obj, predicate) =>
            Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );
            var results = snapshots.val();
            var filteredResults = Object.filter(results, result => result.user !== undefined);
            dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: filteredResults });
        });
    };
};
