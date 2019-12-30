import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

import YEET from './src/YEET.js';
import store from './src/redux/stores/index.js';
import {Provider} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <YEET />
      </Provider>
    );
  }
}
