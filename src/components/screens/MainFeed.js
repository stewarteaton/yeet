import React, {Component} from 'react';
import config from '../../config';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class MainFeed extends Component {
  constructor() {
    super();
  }
  static navigationOptions = {
    title: 'Travel Forums',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={{flex: 1, width: 100 + '%', height: 100 + '%'}}>
        <View style={styles.nav}>
          <Text>Instagram</Text>
          <View>
            <Text>Ionicons Icons</Text>
            <Icon size={24} color="black" name="ios-add" />
            <Text
              onPress={() => this.props.navigation.navigate('thailandFeed')}>
              Go To Thailand
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    top: 50 + '%',
  },
});

export default MainFeed;
