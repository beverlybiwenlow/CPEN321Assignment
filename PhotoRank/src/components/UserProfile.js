import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import FeedList from './FeedList';
import { fetchProfile, fetchUserPosts } from '../actions';

import TestComponent from './TestComponent';

class UserProfile extends Component {
    componentWillMount() {
        const { currentUser } = firebase.auth();
        this.props.fetchUserPosts({uid: currentUser.uid });
        this.props.fetchProfile();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {
            const { currentUser } = firebase.auth();
            this.props.fetchUserPosts({ uid: currentUser.uid });
        }
    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        });
    }

    renderUserHeader() {
        const displayName = this.props.userProfile.displayName || "";
        return (
            <Text> {displayName} </Text>
        );
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
};

export default connect(mapStateToProps, { fetchProfile, fetchUserPosts })(UserProfile);
