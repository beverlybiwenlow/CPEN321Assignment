import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import FeedList from './FeedList';
import { fetchProfile, fetchUserPosts } from '../actions';

class UserProfile extends Component {
    componentWillMount() {
        this.props.fetchUserPosts();
        this.props.fetchProfile();
    }

    renderUserHeader() {
        const displayName = this.props.userProfile.displayName || "";
        return (
            <Text> {displayName} </Text>
        )
    }

    render() {
        const { userProfile } = this.props;
        return (
            <View>
                {this.renderUserHeader()}
                <FeedList />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const userProfile = state.user;

    return { userProfile };
}

export default connect(mapStateToProps, { fetchProfile, fetchUserPosts })(UserProfile);
