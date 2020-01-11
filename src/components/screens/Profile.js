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
import constants from '../../redux/constants';

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Profile');
    console.log(this.props);
  }
  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, width: 100 + '%', height: 100 + '%', alignItems: 'center'}}>
          {/* <Image style={styles.img} source={{uri: 'https://images.unsplash.com/photo-1516069213778-f52c5ac638fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} /> */}
          <ImageCarousel layout={'default'} />
            <View style={styles.infoHeader} >
              <Text style={styles.name}>{this.props.user.userName}</Text>
              <TouchableOpacity style={styles.editProfile} onPress={console.log('df')}>
                <Text style={styles.editProfileTxt}>Edit Profile</Text>
              </TouchableOpacity>
           </View>
           <View style={{borderBottomColor: config.themeColor, borderBottomWidth: 1, width: 93 + '%'}} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  img: {
    height: config.styleConstants.screenWidth,
    width: 100 + '%',
  },
  name: {
    fontSize: 35,
    fontFamily: 'Georgia',
    flex: 1,
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
