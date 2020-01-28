import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import config from '../../config';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePictures: this.props.user.profilePictures,
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
    console.log(this.props);
  }

  deleteImg = event => {
    var obj = this.state.profilePictures;
    obj[event].order = '';
    this.setState(obj);
    // Alert.alert(
    //   'Delete Picture?',
    //   'Warning, you cannot undo this action',
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => console.log(event)},
    //   ],
    //   {cancelable: false},
    // );
  }

  render() {
    const {
      user: {profilePictures},
    } = this.props;
    console.log('Profile pics: ' + this.state);
    return (
      <View style={{width: 100 + '%', height: 100 + '%', flex: 1, alignItems: 'center'}}>
        <View style={styles.imageSection}>
          {/* <TouchableOpacity style={styles.imgTouch} onPress={console.log('hsdf')} >
            {profilePictures[0] ? 
              <Image style={styles.previewImg} source={{uri: profilePictures[0].url}}
             : 
              <Image style={styles.previewImg} source={{uri: profilePictures[0].url}}
            }
          </TouchableOpacity> */}

          {this.state.profilePictures.map((image, i) => {
            return image.order ? (
              <TouchableOpacity style={styles.imgContainer} onPress={() => this.deleteImg(i)}>
                <Image
                  key={image.order}
                  source={{uri: image.url}}
                  style={styles.previewImg}
                />
                <Badge value="X" status="error" 
                containerStyle={{ position: 'absolute', top: 5, right: 15}}
                textStyle={{width: 20, height: 20, fontSize: 18}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.addImgContainer}>
                <View style={styles.addImgIcon} />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.infoSection}>
          <Text>{this.props.user.userName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageSection: {
    width: 100 + '%',
    height: 35 + '%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imgContainer: {
    width: config.styleConstants.oneThirdWidth,
    height: config.styleConstants.oneThirdWidth,
    // justifyContent: 'center',
    // backgroundColor: 'green',
  },
  previewImg: {
    width: config.styleConstants.screenWidth / 4.5,
    height: config.styleConstants.screenWidth / 5,
    margin: 15,
    borderRadius: 7,
  },
  addImgIcon: {
    width: config.styleConstants.screenWidth / 4.5,
    height: config.styleConstants.screenWidth / 5,
    margin: 15,
    borderRadius: 7,
    backgroundColor: 'green',
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

export default connect(
  mapStateToProps,
  dispatchToProps,
)(EditProfile);
