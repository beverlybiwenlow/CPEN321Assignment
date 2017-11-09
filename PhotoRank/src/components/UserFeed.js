import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';

import FeedList from './FeedList';
import SearchArea from './SearchArea';
import { fetchPosts } from '../actions';

class UserFeed extends Component {

    componentWillMount() {
        this.props.fetchPosts();
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
                <SearchArea />
                <FeedList />
            </View>
        );
    }
}

export default connect(null, { fetchPosts })(UserFeed);
