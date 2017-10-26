import React, { Component } from 'react';
import { SearchBar, Button } from 'react-native-elements';
import { View, Text } from 'react-native';

class SearchArea extends Component {
    state = {
        queryTerm: '',
        showTypes: false
    };

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

    onPress() {
        this.setState({ showTypes: !this.state.showTypes});
    }

    renderTypes() {
        if(this.state.showTypes) {
            return (
                <View style={styles.buttonContainerStyle}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        raised
                        title='Tags' />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        raised
                        title='User' />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        raised
                        title='Location' />
                </View>
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

export default SearchArea;
