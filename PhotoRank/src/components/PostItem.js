import React, { Component } from 'react';
import { Text } from 'react-native';

import { Card, CardSection } from './common';

class PostItem extends Component {
    render() {
        console.log('Post Item', this.props.post);
        const { post } = this.props
        return (
            <Card>
                <CardSection>
                    <Text>
                        { "User: " + post.displayName }
                    </Text>
                </CardSection>
                <CardSection>
                    <Text>
                        { 'Caption: ' + post.caption }
                    </Text>
                </CardSection>
                <CardSection>
                    <Text>
                        { 'Likes: ' + post.likeCount }
                    </Text>
                </CardSection>
                <CardSection>
                    <Text>
                        {'Url: ' + post.url}
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default PostItem;
