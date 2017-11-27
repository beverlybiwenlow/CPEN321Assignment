import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import Geocoder from 'react-native-geocoder';

import { Card, CardSection, Input, Button, Spinner } from './common';
import { captionChanged, uploadToDatabase, tagChanged, locationChanged } from '../actions'

// caption, tag, geolocation

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = { error: ''};
    }
    componentWillMount() {

        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log('position', position.coords.latitude, position.coords.longitude);
            Geocoder.geocodePosition({lat: position.coords.latitude, lng : position.coords.longitude}).then(res => {
                console.log('geocode response', res[0].feature)
                this.props.locationChanged(res[0].feature);
            }).catch(err => console.log(err));
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

    }

    onCaptionChange(text) {
        this.props.captionChanged(text);
    }

    onTagChange(text) {
        this.props.tagChanged(text);
    }

    onButtonPress() {
        const { displayName } = this.props.user.user;
        const { url, caption, tags, location } = this.props.uploadState;
        this.props.uploadToDatabase(displayName, url, caption, tags.toLowerCase(), location);
    }

    render() {
        const { caption, tags } = this.props.uploadState;

        return (
          <KeyboardAvoidingView behaviour="padding">
            <Card>
                <CardSection>
                    <Input
                        label="Caption"
                        placeholder="Your caption goes here!"
                        onChangeText={this.onCaptionChange.bind(this)}
                        value={caption}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Tags"
                        placeholder="Your tags goes here!"
                        onChangeText={this.onTagChange.bind(this)}
                        value={tags}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Post
                    </Button>
                </CardSection>
            </Card>
          <View style={{ height: 60 }} />
          </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.user;
    const uploadState = state.upload;
    return { user, uploadState };
};

export default connect(mapStateToProps, {
    captionChanged, uploadToDatabase, tagChanged, locationChanged
})(UploadForm);
