import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import { connect } from 'react-redux';

import PostItem from './PostItem';

class FeedList extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ feed }) {
        const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(feed);
    }

    renderRow(post) {
        return <PostItem post={post} />;
    }

    renderList() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }

    renderEmptyFeed() {
        return (
            <Text>
                No Posts to show
            </Text>
        );
    }

    render() {
        const { feed, clean } = this.props;
        return feed.length === 0 && clean === false ? this.renderEmptyFeed() : this.renderList();
    }
}

const mapStateToProps = (state) => {
    const feed = _.map(state.feed.posts, (val, uid) => {
        return {...val, uid};
    });
    console.log('feed list props', { feed, clean: state.feed.clean })
    return { feed, clean: state.feed.clean };
};

export default connect(mapStateToProps)(FeedList);
