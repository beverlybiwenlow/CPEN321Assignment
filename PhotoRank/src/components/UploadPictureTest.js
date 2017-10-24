import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, ActivityIndicator, AppRegistry } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';

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

class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // setUserPost(imageURL) {
  //   const { currentUser } = firebase.auth();
  //   var postData = {
  //     caption: 'This is a caption hahaha',
  //     displayName: "Find a way to get the name",
  //     likeCount: 0,
  //     url: imageURL,
  //     user: currentUser.uid
  //   };
  //
  //   //get a key for new post
  //   var newPostKey = firebase.database().ref().child('posts').push().key;
  //
  //   //writes data to the posts list
  //   var updates = {};
  //   updates['/posts/' + newPostKey] = postData;
  //   updates['/userPosts/' + currentUser.uid + '/' + newPostKey] = true;
  //
  //   return firebase.database().ref().update(updates);
  //   }

  _pickImage() {
    this.setState({ uploadURL: '' });

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
    // TODO: pass in image URL (currently using dummy url)
    // this.setUserPost("https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg");
  }


  render() {
    const { container, image, upload } = styles;
    return (
      <View style={ container }>
        {
          (() => {
            switch (this.state.uploadURL) {
              case null:
                return null
              case '':
                return <ActivityIndicator />
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: this.state.uploadURL }}
                      style={ image }
                    />
                    <Text>{ this.state.uploadURL }</Text>
                  </View>
                )
            }
          })()
        }
        <TouchableOpacity onPress={ () => this._pickImage() }>
          <Text style={ upload }>
            Tap here to upload a picture
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
}

export default UploadPicture