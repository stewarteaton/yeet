import React, {Component} from 'react';
import {connect} from 'react-redux';
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

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Profile');
    console.log(this.props);
    console.log(this.props.state);
  }
  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, width: 100 + '%', height: 100 + '%'}}>
          {/* <Image style={styles.img} source={{uri: 'https://images.unsplash.com/photo-1516069213778-f52c5ac638fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} /> */}
          <ImageCarousel layout={'default'} />
          <Text style={styles.name}>{this.props.user.account.user.id}</Text>
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
    fontSize: 30,
  },
});

const mapStateToProps = state => {
  return {
    user: state,
  };
};

const dispatchToProps = dipatch => {
  return {};
};

export default connect(mapStateToProps, dispatchToProps)(Profile);
