import React, { Component } from 'react';
import { View, Text, ListView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import FeedList from './FeedList';
import { fetchProfile, fetchUserPosts } from '../actions';
import { Card, CardSection } from './common';

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
        const {thumbnailContainerStyle,thumbnailStyle,headerContentStyle,headerTextStyle,descriptionTextStyle} = styles;
        const displayName = this.props.userProfile.displayName || "";
        return (
            // <Card>
              <CardSection>
                <View style = {thumbnailContainerStyle}>
                  <Image style={thumbnailStyle} source={{uri: "https://i.pinimg.com/736x/28/64/d5/2864d5114f4f7be2abef0fceb6ccb7c2--funny-mugshots-mug-shots.jpg"}} />
                </View>
                <View style = {headerContentStyle}>
                  <Text style = {headerTextStyle}>
                      { displayName }
                  </Text>
                  <Text style = {descriptionTextStyle}>
                      {'Profession: Amateur Photographer'}
                  </Text>
                  <Text style = {descriptionTextStyle}>
                      {'Tools: Nikon DSLR, iPhone X, Pixel 2, DJI Inspire 2'}
                  </Text>
                </View>
              </CardSection>
            // </Card>
            // <Text> {displayName} </Text>
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

const styles = {
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  thumbnailStyle: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  headerTextStyle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
  },
  descriptionTextStyle: {
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 5,
    fontSize: 12,
    fontFamily: 'OpenSans-Light'
  }
}

const mapStateToProps = (state) => {
    const userProfile = state.user;

    return { userProfile };
};

export default connect(mapStateToProps, { fetchProfile, fetchUserPosts })(UserProfile);
