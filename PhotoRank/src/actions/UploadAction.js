import firebase from 'firebase';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseKeyEncode from 'firebase-key-encode';

import { Actions } from 'react-native-router-flux';

import {
    UPDATE_DATABASE_SUCCESS,
    UPLOADING_IMAGE_IN_PROGRESS,
    SELECT_IMAGE_SUCCESS,
    CAPTION_CHANGED,
    TAG_CHANGED,
    LOCATION_CHANGED
} from './types';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = firebase.storage().ref('images').child(`${sessionId}`);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
    });
  })
};

const setUserPost = (displayName, imageURL, caption, tags, location) => {
  const { currentUser } = firebase.auth();
  var escapedLocation = firebaseKeyEncode.encode(location);
  var postData = {
    caption: caption,
    displayName: displayName,
    likeCount: 0,
    likers: {dummy: true},
    url: imageURL,
    user: currentUser.uid,
    location: escapedLocation,
    tags: convertTags(tags)
  };
  //get a key for new post
  var newPostKey = firebase.database().ref().child('posts').push().key;
  //writes data to the posts list
  var updates = {};
  updates['/posts/' + newPostKey] = postData;

  // assign post to user
  updates['/userPosts/' + currentUser.uid + '/' + newPostKey] = true;

  // assign post to related tags
  if (tags !== '') {
      const tagsList = tags.replace(' ', '').split(',');
      tagsList.forEach((tag) => {
         updates[`/tags/${tag}/${newPostKey}`] = true;
      });
  }

  // assign post to location
 if (location !== null || location == undefined) {
     updates[`/locationFeature/${escapedLocation.toLowerCase()}/${newPostKey}`] = true;
 }
  return firebase.database().ref().update(updates);
};

const convertTags = (tags) => {
    if (tags === '') {
        return null;
    } else {
        const tagsList = tags.replace(' ', '').split(',');
        let obj = {};
        tagsList.forEach((tag) => {
            obj[tag] = true;
        });
        return obj;
    }
}

export const selectImage = () => {
  return (dispatch) => {
    ImagePicker.launchImageLibrary({}, response  => {
      dispatch({ type: UPLOADING_IMAGE_IN_PROGRESS });
      uploadImage(response.uri)
        .then(url => {
          dispatch({ type: SELECT_IMAGE_SUCCESS, payload: url });
        })
        .catch(error => console.log(error))
    })
  }
}

export const uploadToDatabase = (displayName, imageURL, caption, tags, location) => {
    return (dispatch) => {
        setUserPost(displayName, imageURL, caption, tags, location);
        dispatch({ type: UPDATE_DATABASE_SUCCESS });

        Actions.push("userProfile");
    }
}

export const captionChanged = (text) => {
    return {
        type: CAPTION_CHANGED,
        payload: text
    };
}

export const tagChanged = (text) => {
    return {
        type: TAG_CHANGED,
        payload: text
    };
}

export const locationChanged = (text) => {
    return {
        type: LOCATION_CHANGED,
        payload: text
    };
}
