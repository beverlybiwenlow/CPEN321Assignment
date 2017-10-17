import React, { Component } from 'react';
import { Text, View, Image, Button, Alert} from 'react-native';
import firebase from 'firebase';
import { Card, CardSection } from './common';

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {liked: false};
}

onButtonPress = () => {  
  
  // alert(this.props.liked);
  alert(this.props.post.likeCount);
  if(this.state.liked){
    firebase.database().ref('posts/' + this.props.post.uid).update({
      likeCount: this.props.post.likeCount - 1
    });
  } else{
    firebase.database().ref('posts/' + this.props.post.uid).update({
      likeCount: this.props.post.likeCount + 1
    });
  }
  

  this.setState({
    liked: !(this.state.liked)
  });

}


    render() {
        console.log('Post Item', this.props.post);
        console.log(this.props);
        const { thumbnailStyle, headerContentStyle, footerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle, likeButtonStyle } = styles;
        const { post } = this.props
        let toggle = this.state.liked ? 'UNDO LIKE' : 'CLICK TO LIKE';
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
                    <Text>Company name</Text>
                  </View>
                </CardSection>
                <CardSection>
                  <Image style={imageStyle} source={{ uri: post.url }} />
                </CardSection>
                <CardSection>
                  <View>
                  <Button style={likeButtonStyle} onPress={this.onButtonPress} title={toggle}></Button>
                  </View>
                </CardSection>
                <CardSection>
                  <View style = {footerContentStyle}>
                    <Text>
                        { 'Likes: ' + post.likeCount }
                    </Text>
                    <Text>
                        { 'Caption: ' + post.caption }
                    </Text>
                    <Text>
                        {'Url: ' + post.url}
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
    justifyContent: 'space-around'
  },
  footerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
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
  }
};

export default PostItem;
