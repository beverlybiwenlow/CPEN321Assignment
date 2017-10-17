import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PostItem from './PostItem';
import FeedList from './FeedList';

class UserFeed extends Component {
    // renderPostItems() {
    //     return dummy.map((image) => {
    //         return <PostItem post={image} key={image.imageId}/>;
    //     });
    // }

    render() {
        return (
            <View>
                <FeedList />
            </View>
        );
    }
}

const dummy = [
    {
        imageId: 1,
        caption: 'image 1'
    },
    {
        imageId: 2,
        caption: 'image 2'
    },
    {
        imageId: 3,
        caption: 'image 3'
    }
]

export default UserFeed;
