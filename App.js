import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

import YEET from './src/YEET.js';
import store from './src/redux/stores';
import { Provider } from 'react-redux';
import axios from 'axios';
import config from './src/config';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// so proxy base api url works outside of development stage // sol to problem with live-server in production build
axios.defaults.baseURL = config.baseUrl;

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <YEET />
      </Provider>
    );
  }
}
