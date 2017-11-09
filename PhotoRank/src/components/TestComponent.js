
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-elements';
import { View, Text, Image, Switch } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

class TestComponent extends Component { 
    // state = {
    //   show: false
    // }
    // render() {
    // //  return this.state.show
    // //    ? (<Text>Hello World!</Text>)
    // //    : (<TouchableOpacity onPress={() => this.setState({show: true})}>
    // //        <Image source='images/greet.png' accessibilityLabel='Greet' />
    // //      </TouchableOpacity>);
    
    // return(<Text>Hello World</Text>)
    // }

    constructor(props){
      super(props);
      this.state = {
          value: false
      }
  }


  onValueChange(value){
      console.log(value);
      this.setState({value: value});
  }

  render(){
      let toggle = this.state.value ? 'ON' : 'OFF';
      return (
      <View>
          <Text>{toggle}</Text>
          <Switch 
              onValueChange={(value) => this.onValueChange(value)}
              value={this.state.value}
              accessibilityLabel='Greet'
          />
      </View>
      )
  }
  }

  const mapStateToProps = (state) => {
    const feed = _.map(state.feed.posts, (val, uid) => {
        return {...val, uid};
    });

    return { feed, clean: state.feed.clean };
};

  export default connect(mapStateToProps)(TestComponent);