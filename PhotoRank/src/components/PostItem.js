import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { Card, CardSection } from './common';

class PostItem extends Component {
    render() {
        console.log('Post Item', this.props.post);
        const { thumbnailStyle, headerContentStyle, footerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle } = styles;
        const { post } = this.props
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
                  <Image style={imageStyle} source={{ uri: "https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg" }} />
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
  }
};

export default PostItem;
