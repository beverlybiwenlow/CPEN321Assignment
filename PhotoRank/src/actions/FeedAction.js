import firebase from 'firebase';
import firebaseKeyEncode from 'firebase-key-encode';

import {
    RESET_FEED,
    FETCH_USER_POSTS_SUCCESS
} from './types';

var single_refs = null;

export const fetchUserPosts = ({ uid}) => {
    // const { currentUser } = firebase.auth();
    console.log(`fetching posts for ${uid}`);
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        single_refs !== null ? single_refs.off() : null;
        single_refs = firebase.database().ref(`/userPosts/${uid}`);
        single_refs
            .on('value', snapshots => {
                var promises = [];
                var posts = {};
                snapshots.forEach((key) => {
                    promises.unshift(
                        firebase.database().ref(`/posts/${key.key}`).once('value')
                    );
                });
                Promise.all(promises).then((snapshots) => {
                    snapshots.forEach((snapshot) => {
                        posts[snapshot.key] = snapshot.val();
                    });
                    console.log('fetch user posts');
                    dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: posts});
                });
            });
        };
    };

export const fetchTagPosts = ({ tag }) => {
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        single_refs !== null ? single_refs.off() : null;
        single_refs = firebase.database().ref(`/tags/${tag}`);
        single_refs
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
                    console.log('fetch tag posts');
                    dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: posts});
                });
            });
    };
};

export const fetchLocationPosts = ({ location }) => {
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        var escapedLocation = firebaseKeyEncode.encode(location);
        var query = `/locationFeature/${escapedLocation.toLowerCase()}`
        single_refs !== null ? single_refs.off() : null;
        single_refs = firebase.database().ref(query);
        single_refs
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
                    console.log('fetch location posts');
                    dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: posts});
                });
            });
    };
};

export const fetchPosts = () => {
    console.log('fetching all posts');
    return (dispatch) => {
        dispatch({ type: RESET_FEED });
        single_refs !== null ? single_refs.off() : null;
        single_refs = firebase.database().ref('/posts').orderByChild('likeCount').limitToFirst(50);
        single_refs.on('value', snapshots => {
            Object.filter = (obj, predicate) =>
            Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );
            var results = snapshots.val();
            var filteredResults = Object.filter(results, result => result.user !== undefined);
            console.log('fetch posts');
            dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: filteredResults });
        });
    };
};
