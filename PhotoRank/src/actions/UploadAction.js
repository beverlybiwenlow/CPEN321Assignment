import firebase from 'firebase';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import {
    UPDATE_DATABASE_SUCCESS,
    UPLOADING_IMAGE_IN_PROGRESS
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

const setUserPost = (displayName, imageURL) => {
  const { currentUser } = firebase.auth();
  var postData = {
    caption: 'This is a caption hahaha',
    displayName: displayName,
    likeCount: 0,
    likers: {dummy: true},
    url: imageURL,
    user: currentUser.uid
  };
  //get a key for new post
  var newPostKey = firebase.database().ref().child('posts').push().key;
  //writes data to the posts list
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/userPosts/' + currentUser.uid + '/' + newPostKey] = true;

  return firebase.database().ref().update(updates);
};

export const uploadToDatabase = (displayName) => {
  return (dispatch) => {
    ImagePicker.launchImageLibrary({}, response  => {
      dispatch({ type: UPLOADING_IMAGE_IN_PROGRESS });
      uploadImage(response.uri)
        .then(url => {
          setUserPost(displayName, url)
          dispatch({ type: UPDATE_DATABASE_SUCCESS, payload: url });
        })
        .catch(error => console.log(error))
    })
  }

}
