import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

import YEET from './src/YEET.js';
import store from './src/redux/stores';
import { Provider } from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
// Test
// import userRecieved from './src/redux/actions';

// //test
// console.log(store.getState());
// // // Every time the state changes, log it
// // // Note that subscribe() returns a function for unregistering the listener
// // const unsubscribe = store.subscribe(() => console.log(store.getState()));
// // // Dispatch some actions
// store.dispatch(userRecieved('Learn about actions'));

// // unsubscribe();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <YEET />
      </Provider>
    );
  }
}
