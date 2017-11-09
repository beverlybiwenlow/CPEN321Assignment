import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
//import Geocoder from 'react-native-geocoder';

import FeedList from './FeedList';
import SearchArea from './SearchArea';
import { fetchTagPosts, fetchPosts } from '../actions';

class UserFeed extends Component {

    componentWillMount() {
        this.props.fetchPosts();

        // navigator.geolocation.getCurrentPosition(
        //   (position) => {
        //     console.log('position', position.coords.latitude, position.coords.longitude);
        //     Geocoder.geocodePosition({lat: position.coords.latitude, lng : position.coords.longitude}).then(res => {
        //         console.log('geocode response', res)
        //     }).catch(err => console.log(err));
        //   },
        //   (error) => this.setState({ error: error.message }),
        //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        // );
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {
            this.props.fetchPosts();
        }
    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        });
    }

    render() {
        return (
            <View>
                <SearchArea fetchPosts={this.props.fetchPosts} fetchTagPosts={this.props.fetchTagPosts}/>
                <FeedList />
            </View>
        );
    }
}

export default connect(null, { fetchTagPosts, fetchPosts })(UserFeed);
