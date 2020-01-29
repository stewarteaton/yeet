import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import PostFeed from '../container/PostFeed';

export class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Feed',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  };

  render() {
    return (
      <View style={{width: 100 + '%', flex: 1}}>
        <PostFeed />
      </View>
    );
  }
}

export default MainFeed;
