import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';

import FeedList from './FeedList';
import { fetchTagPosts, fetchPosts } from '../actions';

class UserFeed extends Component {
    state = {
        queryTerm: ''
    };

    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {
            this.props.fetchPosts();
        }
    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        });
    }

    onQueryChange(text) {
        this.setState({ queryTerm: text});
    }

    onSearchSubmit(queryTerm) {
        const query = queryTerm.toLowerCase();
        if (query === '') {
            this.props.fetchPosts();
        } else {
            this.props.fetchTagPosts({ tag: query});
        }
        this.setState({ queryTerm: ''});
    }

    render() {
        return (
            <View>
                <SearchBar
                  autoCapitalize='none'
                  autoCorrect={false}
                  round
                  lightTheme
                  onChangeText={this.onQueryChange.bind(this)}
                  placeholder='Search'
                  value={this.state.queryTerm}
                  onEndEditing={() => this.onSearchSubmit(this.state.queryTerm)}
                />
                <FeedList />
            </View>
        );
    }
}

export default connect(null, { fetchTagPosts, fetchPosts })(UserFeed);
