import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, AppRegistry } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { selectImage } from '../actions';
import UploadForm from './UploadForm';


class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderUploadForm() {
      const { selectedImage } = this.props.uploadState;
      const { uploadButton, uploadForm } = styles;

      if (selectedImage) {
          return (
              <View style= {uploadForm}>
                  <UploadForm />
              </View>
          );
      } else {
          return (
              <TouchableOpacity onPress={ () => this.props.selectImage() }>
                <Text style={ uploadButton }>
                  Tap here to upload a picture
                </Text>
              </TouchableOpacity>
          );
      }
  }

  render() {
    const { container, image, upload } = styles;
    const { url } = this.props.uploadState;
    return (
      <View style={ container }>
        {
          (() => {
            switch (url) {
              case null:
                return null
              case '':
                return <ActivityIndicator />
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: url }}
                      style={ image }
                    />
                    <Text>{ url }</Text>
                  </View>
                )
            }
          })()
        }
        {this.renderUploadForm()}
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
  uploadButton: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  uploadForm: {
      alignSelf: 'stretch'
  }
}

const mapStateToProps = (state) => {
    const user = state.user;
    const uploadState = state.upload;
    return { user, uploadState };
};

export default connect(mapStateToProps, { selectImage })(UploadPicture)
