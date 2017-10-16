import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PostItem from './PostItem';

class UserProfile extends Component {
    renderPostItems() {
        return dummy.map((image) => {
            return <PostItem image={image} key={image.imageId}/>;
        });
    }

    render() {
        return (
            <View>
                {this.renderPostItems()}
            </View>
        );
    }
}

const dummy = [
    {
        imageId: 1,
        caption: 'Profile 1'
    },
    {
        imageId: 2,
        caption: 'Profile 2'
    },
    {
        imageId: 3,
        caption: 'Profile 3'
    }
]

export default UserProfile;
