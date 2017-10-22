import React, { Component } from 'react';
import { Text, View, Image, Button, Alert} from 'react-native';
import firebase from 'firebase';
import { Card, CardSection } from './common';

class PostItem extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    this.state = {liked: this.props.post.likers[currentUser.uid], likeCountFromDB: this.props.post.likeCount};
    // this.state = {liked: false, likeCountFromDB: this.props.post.likeCount};

    console.log(this.state.liked);
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
  })
}

changeLikeState = (userLiked) => {
  this.setState({liked: userLiked})
}

    render() {
        // console.log('Post Item', this.props.post);
        console.log(this.props);
        const { thumbnailStyle, headerContentStyle, captionStyle, footerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle, likeCountStyle, likeButtonStyle, urlTextStyle } = styles;
        const { post } = this.props
        const { currentUser } = firebase.auth();

        // console.log(this.props.post.likers[currentUserID]);
        let toggle = this.state.liked ? 'UNDO LIKE' : 'CLICK TO LIKE';
        // var likedRef = firebase.database().ref('posts/' + this.props.post.uid + '/likers/' + currentUser.uid);
        // var userLiked;
        // likedRef.on('value', function(snapshot) {
        //   userLiked = snapshot.val();
        // });
        // this.changeLikeState(userLiked);

        return (
            <Card>
                <CardSection>
                  <View style = {thumbnailContainerStyle}>
                    <Image style={thumbnailStyle} source={{uri: "https://i.pinimg.com/736x/28/64/d5/2864d5114f4f7be2abef0fceb6ccb7c2--funny-mugshots-mug-shots.jpg"}} />
                  </View>
                  <View style = {headerContentStyle}>
                    <Text style = {headerTextStyle}>
                        { "User: " + post.displayName }
                    </Text>
                    <Text style = {urlTextStyle}>
                        {'Url: ' + post.url}
                    </Text>
                  </View>
                </CardSection>
                <CardSection>
                  <Image style={imageStyle} source={{ uri: post.url }} />
                </CardSection>
                <CardSection>
                  <View flexDirection="row" alignItems="center">
                  <Button style={likeButtonStyle} onPress={this.onButtonPress} title={toggle}></Button>
                  <Text style={likeCountStyle}>
                        { 'Likes: ' + this.state.likeCountFromDB }
                    </Text>
                  </View>
                </CardSection>
                <CardSection>
                  <View style = {footerContentStyle}>
                    <Text style={captionStyle}>
                        { 'Caption: ' + post.caption }
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
  footerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  urlTextStyle: {
    flex: 1,
    flexWrap: 'wrap'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  likeButtonStyle: {
    height: 25,
    fontSize: 100,
    color:'coral'
  },
  likeCountStyle: {
    fontSize: 30,
    color: 'coral'
  },
  captionStyle: {
    fontSize: 20,
    color: 'green'
  }
};

export default PostItem;
