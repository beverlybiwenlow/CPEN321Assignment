import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, AppRegistry } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { uploadToDatabase } from '../actions';


class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { container, image, upload } = styles;

    return (
      <View style={ container }>
        {
          (() => {
            switch (this.props.uploadState.url) {
              case null:
                return null
              case '':
                return <ActivityIndicator />
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: this.props.uploadState.url }}
                      style={ image }
                    />
                    <Text>{ this.props.uploadState.url }</Text>
                  </View>
                )
            }
          })()
        }
        <TouchableOpacity onPress={ () => this.props.uploadToDatabase(this.props.user.displayName) }>
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

const mapStateToProps = (state) => {
    const user = state.user;
    const uploadState = state.upload;
    return { user, uploadState };
};

export default connect(mapStateToProps, { uploadToDatabase })(UploadPicture)
