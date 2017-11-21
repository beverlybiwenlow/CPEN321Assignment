import React, { Component } from 'react';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { fetchTagPosts, fetchPosts, fetchUserPosts, fetchLocationPosts } from '../actions';

class SearchArea extends Component {
    state = {
        queryTerm: '',
        showTypes: false,
        selectedIndex: 0
    };

    onQueryChange(text) {
        this.setState({ queryTerm: text});
    }

    onSearchSubmit(query) {
        // default fetch if there is no query
        if (query === '') {
            this.props.fetchPosts();
        } else {
            // send different search depending on index
            switch(this.state.selectedIndex) {
                case 0:
                    this.props.fetchTagPosts({ tag: query.toLowerCase()});
                    break;
                case 1:
                    this.props.fetchUserPosts({ uid: query });
                    break;
                case 2:
                    this.props.fetchLocationPosts({ location: query.toLowerCase() });
                    break;
            }
        }

        this.setState({ queryTerm: ''});
    }

    onPress() {
        this.setState({ showTypes: !this.state.showTypes});
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex });
    }

    renderTypes() {
        const buttons = [ 'Tags', 'Users', 'Location']
        if(this.state.showTypes) {
            return (
                <ButtonGroup
                  onPress={this.updateIndex.bind(this)}
                  selectedIndex={this.state.selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: 40}} />
            );
        } else {
            return null;
        }
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
                  onFocus={() => this.onPress()}
                  onBlur={() => this.onPress()}
                />
                {this.renderTypes()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap'
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        flex: 0.3
     }
}

export default connect(null, {
    fetchTagPosts, fetchPosts, fetchUserPosts, fetchLocationPosts
})(SearchArea);
