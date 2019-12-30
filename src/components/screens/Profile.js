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
  ScrollView,
} from 'react-native';
import {ImageCarousel} from '../presentation/imageCarousel';
// console.log('Image Caro ' + ImageCarousel);

export class Profile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, width: 100 + '%', height: 100 + '%'}}>
          {/* <Image style={styles.img} source={{uri: 'https://images.unsplash.com/photo-1516069213778-f52c5ac638fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} /> */}
          <ImageCarousel layout={'default'} />
          <Text style={styles.name}>Helo</Text>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: config.styleConstants.screenWidth,
    width: 100 + '%',
  },
  name: {
    fontSize:30,
  }
});


export default Profile;
