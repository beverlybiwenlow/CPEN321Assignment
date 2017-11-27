import React, { Component } from 'react';
import { Text, View, Image, Button, Alert, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import FitImage from 'react-native-fit-image';

import { Card, CardSection } from './common';

class PostItem extends Component {
    constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    this.state = {liked: this.props.post.likers[currentUser.uid],
                        likeCountFromDB: this.props.post.likeCount,
                        user : null};

    firebase.database().ref(`/users/${this.props.post.user}`)
        .on('value', snapshot => {
            const userInfo = snapshot.val();
            this.state = {liked: this.props.post.likers[currentUser.uid],
                                likeCountFromDB: this.props.post.likeCount,
                                user : userInfo};
        });
    }

    onButtonPress = () => {
    const { currentUser } = firebase.auth();
    var likeCountFromDB;
    var likeCountRef = firebase.database().ref('posts/' + this.props.post.uid + '/likeCount');
    likeCountRef.on('value', function(snapshot) {
        likeCountFromDB = snapshot.val();
    });
    if(this.state.liked){
        firebase.database().ref('posts/' + this.props.post.uid).update({
            likeCount: (this.state.likeCountFromDB - 1)
    });
    firebase.database().ref('posts/' + this.props.post.uid + '/likers/').set({[currentUser.uid] : false});

    } else {
        firebase.database().ref('posts/' + this.props.post.uid).update({
            likeCount: (this.state.likeCountFromDB + 1)
    });
    firebase.database().ref('posts/' + this.props.post.uid + '/likers/').set({[currentUser.uid] : true});
    }

    this.setState({
        liked: !(this.state.liked),
        likeCountFromDB: likeCountFromDB
    });

    }

    changeLikeState = (userLiked) => {
        this.setState({liked: userLiked});
    }

    renderPhotoURL(user) {
        if (user !== null) {
            if (user.photoURL !== undefined) {
                return user.photoURL;
            } else {
                return 'https://cdn.onlinewebfonts.com/svg/img_76927.png';
            }
        } else {
            return 'https://cdn.onlinewebfonts.com/svg/img_76927.png';
        }
    }

    renderTags(tags) {
        var tagString = '';
        for (var tag in tags) {
            if (tagString.length === 0) {
                tagString += tag;
            } else {
                tagString += `, ${tag}`;
            }
        }
        return tagString;
    }

    render() {
        const { thumbnailStyle, headerContentStyle, detailsContentStyle, captionStyle, captionBoldStyle, footerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle, likeCountStyle, likeButtonStyle, urlTextStyle, likeText } = styles;
        const { post } = this.props;
        const { user } = this.state;
        const { currentUser } = firebase.auth();

        let toggle = this.state.liked ? 'UNDO LIKE' : 'CLICK TO LIKE';
        let likes = this.state.likeCountFromDB == 1 ? 'Like' : 'Likes';
        return (
            <Card>
                <CardSection>
                  <View style = {thumbnailContainerStyle}>
                    <Image style={thumbnailStyle} source={{uri: this.renderPhotoURL(user) }} />
                  </View>
                  <View style = {headerContentStyle}>
                    <Text style = {headerTextStyle}>
                        { post.displayName }
                    </Text>
                    <View style = {detailsContentStyle}>
                      <Icon name="md-pin" size={16} color="#900" />
                      <Text style = {urlTextStyle}>
                          { post.location || "There is no location" }
                      </Text>
                    </View>
                    <View style = {detailsContentStyle}>
                      <Icon name="md-pricetag" size={18} color="#009" />
                      <Text style = {urlTextStyle}>
                          { post.tags !== undefined ? this.renderTags(post.tags) : "There are no tags" }
                      </Text>
                    </View>
                  </View>
                </CardSection>
                <CardSection>
                  <FitImage
                    source={{ uri: post.url }}
                    style={imageStyle}
                  />
                </CardSection>
                <CardSection>
                  <View flexDirection="row" alignItems="center">
                  <TouchableOpacity style={likeButtonStyle} onPress={this.onButtonPress}>
                    <Text style={likeText}>
                      {toggle}
                    </Text>
                  </TouchableOpacity>
                  <Text style={likeCountStyle}>
                        { this.state.likeCountFromDB + ' ' + likes }
                    </Text>
                  </View>
                </CardSection>
                <CardSection>
                  <View style = {footerContentStyle}>
                    <Text style = {captionStyle}>
                      <Text style = {captionBoldStyle}>
                        {post.displayName}
                      </Text>
                      { "  " + post.caption }
                    </Text>

                  </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  detailsContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex:1
  },
  footerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
  },
  urlTextStyle: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    fontSize: 12,
    fontFamily: 'OpenSans-Light'
  },
  thumbnailStyle: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    borderRadius: 20,
  },
  likeButtonStyle: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#2E86C1',
    borderRadius: 5
  },
  likeText: {
    textAlign: 'center',
    color: '#2E86C1',
    fontFamily: 'OpenSans-Light'
  },
  likeCountStyle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Light',
    marginLeft: 5
  },
  captionBoldStyle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold'
  },
  captionStyle: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'OpenSans-Light',
  }
};

export default PostItem;
