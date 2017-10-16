import React, { Component } from 'react';
import { Text } from 'react-native';

import { Card, CardSection } from './common';

class PostItem extends Component {
    render() {
        const { image } = this.props
        return (
            <Card>
                <CardSection>
                    <Text>
                        { image.caption }
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default PostItem;
