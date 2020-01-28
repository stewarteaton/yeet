/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import {ImageCarousel} from '../container/imageCarousel';
import {BackgroundCarousel} from '../container/BackgroundCarousel';
import constants from '../../redux/constants';

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  };

  componentDidMount() {
    console.log('Profile');
    console.log(this.props);
  }
  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, width: 100 + '%', height: 100 + '%', alignItems: 'center'}}>
          {/* <ImageCarousel layout={'default'} images={this.props.user.profilePictures}/> */}
          <View style={styles.imgContainer}>
            <BackgroundCarousel images={this.props.user.profilePictures} />
          </View>
            <View style={styles.infoHeader} >
              <Text style={styles.name}>{this.props.user.userName}</Text>
              <TouchableOpacity style={styles.editProfile} onPress={() => this.props.navigation.navigate('editProfile')}>
                <Text style={styles.editProfileTxt} >Edit Profile</Text>
              </TouchableOpacity>
           </View>
           <View style={{borderBottomColor: config.themeColor, borderBottomWidth: 1, width: 93 + '%'}} />
           <View style={styles.bio}>
             <Text>
              {this.props.user.bio ? this.props.user.bio : <Text style={styles.bioText} placeholder='Share something'>Edit Profile to add your bio!</Text>}
             </Text>
           </View>
           
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    height: config.styleConstants.screenWidth,
    width: config.styleConstants.screenWidth,
  },
  infoHeader: {
    width: 100 + '%',
    height: 12 + '%',
    backgroundColor: 'white',
    paddingLeft: 5 + '%',
    paddingRight: 5 + '%',
    paddingTop: 2 + '%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editProfile: {
    width: 35 + '%',
    height: 85 + '%',
    backgroundColor: config.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgb(55, 55, 55)',
    borderWidth: 0.5,
  },
  editProfileTxt: {
    color: 'white',
    fontFamily: 'Georgia',
    fontSize: 22,
  },
  name: {
    fontSize: 35,
    fontFamily: 'Georgia',
    flex: 1,
  },
  bio: {
    width: 90 + '%',
    height: 100 + '%',
    backgroundColor: 'rgb(240,240,240)',
    margin: 'auto',
    marginTop: 5 + '%',
    padding: 10,
    borderRadius: 5,
  },
  bioText: {
    fontSize: 20,
  },
  bioInput: {

  },
});

const mapStateToProps = state => {
  return {
    user: state.account,
    UI: state.UI,
  };
};

const dispatchToProps = dipatch => {
  return {};
};

export default connect(mapStateToProps, dispatchToProps)(Profile);
