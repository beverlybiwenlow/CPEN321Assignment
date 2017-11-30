import React, { Component } from 'react';
import { View, Text, ListView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Feather';
import firebaseKeyEncode from 'firebase-key-encode';

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

    renderStarCount(starCount) {
        const { iconStyle } = styles;
        if (starCount !== null) {
            if (starCount > 0) {
                return (
                    <Text>
                        {starCount > 1 ? starCount : null}
                        <Icon
                                    name="star"
                                    size={20}
                                    style={iconStyle}
                                />
                    </Text>);
            }
        }
    }
    renderUserHeader() {
        const {thumbnailContainerStyle,
                    thumbnailStyle,
                    headerContentStyle,
                    headerTextStyle,
                    descriptionTextStyle, displayNameStyle} = styles;
        let { displayName, photoURL, starCount }= this.props.userProfile.user;
        photoURL === null ? photoURL = 'https://cdn.onlinewebfonts.com/svg/img_76927.png' : null;
        return (
            // <Card>
              <CardSection>
                <View style = {thumbnailContainerStyle}>
                  <Image style={thumbnailStyle} source={{ uri: photoURL }} />
                </View>
                <View style = {headerContentStyle}>
                  <Text style = {headerTextStyle}>
                      { `${displayName}   ` }
                      { this.renderStarCount(starCount) }
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
},
iconStyle: {
    alignSelf: 'flex-end'
}
}

const mapStateToProps = (state) => {
    const userProfile = state.user;

    return { userProfile };
};

export default connect(mapStateToProps, { fetchProfile, fetchUserPosts })(UserProfile);
