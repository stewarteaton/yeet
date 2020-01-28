import React, {Component} from 'react';
import {Image, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button} from 'react-native';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import config from '../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePictures: this.props.user.profilePictures,
      bio: this.props.user.bio,
      isMale: this.props.user.isMale,
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
      fontSize: 20,
    },
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Save"
        color="white"
        style={{paddingRight: 10 + '%'}}
      />
    ),
  };

  componentDidMount() {
    console.log(this.props);
  }

  updateText(text, field) {
    var obj = this.state;
    obj[field] = text;
    this.setState(obj);
  }

  deleteImg = event => {
    Alert.alert(
      'Remove Picture?',
      'Warning, you cannot undo this action',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
            return;
          },
          style: 'cancel',
        },
        {text: 'Remove', onPress: () => {
          console.log(event);
            var obj = this.state.profilePictures;
            obj[event].order = '9';
            this.updateOrder();
          },
        },
      ],
      {cancelable: false},
    );
  }

  updateOrder() {
    var obj = this.state.profilePictures;
    obj.sort((a,b) => (a.order > b.order) ? 1 : -1);
    this.setState(obj);
  }

  setMale() {
    var obj = this.state;
    obj.isMale = true;
    this.setState(obj);
  }
  setFemale() {
    var obj = this.state;
    obj.isMale = false;
    this.setState(obj);
  }

  render() {
    const {user: {profilePictures}} = this.props;
    console.log('Profile pics: ' + this.state);
    return (
      <ScrollView>
        <View style={{width: 100 + '%', height: 100 + '%', flex: 1, alignItems: 'center'}}>
          <View style={styles.imageSection}>
            {/* Logic for looping through images */}
            {this.state.profilePictures.map((image, i) => {
              return image.order !== '9' ? (
                <TouchableOpacity style={styles.imgContainer} onPress={() => this.deleteImg(i)}>
                  <Image
                    key={image.order}
                    source={{uri: image.url}}
                    style={styles.previewImg}
                  />
                  <View style={styles.deleteIcon} >
                    <Text style={styles.deleteIconTxt}>X</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.imgContainer}>
                  {/* <View style={styles.addImgIcon} /> */}
                  <View style={styles.addImgIcon}>
                    <FontAwesome name={'plus-square'} size={110} color={config.themeColor} style={styles.fontAwesome}/>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.infoSection}>
            <Text style={{fontSize: 30, fontFamily: 'Georgia'}}>{this.props.user.userName}</Text>
            <TextInput multiline={true} numberOfLines={15} style={styles.bioInput} 
              value={this.state.bio}
              onChangeText={text => this.updateText(text, 'bio')}
              placeholder="Share something about yourself"
            />
          </View>
        </View>
        <View style={styles.genderToggleSection}>
            <Text style={{paddingTop: 3 + '%', paddingLeft: 2 + '%', fontSize: 24, fontFamily: 'Georgia'}}>I am</Text>
            <View style={styles.genderBox}>
              <TouchableOpacity onPress={() => this.setMale()}>
                <View  style={{ backgroundColor: this.state.isMale === true? config.themeColor : 'white', borderRadius: 5}}>
                  <Text style={{ margin: 'auto', padding: 5, fontSize: 20, color: this.state.isMale === false? 'black' : 'white'}}>Male</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setFemale()}>
                <View  style={{ backgroundColor: this.state.isMale === false? config.themeColor : 'white',borderRadius: 5}}>
                  <Text style={{ margin: 'auto', padding: 5, fontSize: 20, color: this.state.isMale === false? 'white' : 'black'}}>Female</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageSection: {
    width: 100 + '%',
    height: config.styleConstants.screenHeight / 3.2,
    backgroundColor: 'rgb(230,230,230)',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5 + '%',
  },
  imgContainer: {
    width: config.styleConstants.oneThirdWidth,
    height: config.styleConstants.oneThirdWidth,
    // justifyContent: 'center',
    // backgroundColor: 'green',
  },
  previewImg: {
    width: 70 + '%',
    height: 70 + '%',
    // width: config.styleConstants.screenWidth / 4.5,
    // height: config.styleConstants.screenWidth / 4.5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 7,
  },
  deleteIcon: {
    position: 'absolute',
    top: -10,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 15,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  deleteIconTxt: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    top: -3 + '%',
    right: -23 + '%',
  },
  addImgIcon: {
    width: 70 + '%',
    height: 70 + '%',
    // backgroundColor: 'green',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 7,
  },
  fontAwesome: {
    marginTop: -6 + '%',
    marginLeft: 1 + '%',
  },
  infoSection: {
    width: 95 + '%',
    height: 100 + '%',
    // backgroundColor: 'rgb(150,150,150)',
    marginTop: 3 + '%',
  },
  bioInput: {
    marginTop: 2 + '%',
    height: config.styleConstants.screenHeight / 3,
    backgroundColor: 'white',
    fontSize: 16,
    padding: 2 + '%',
    borderWidth: 2,
    borderColor: config.themeColor,
    borderRadius: 5,
  },
  genderToggleSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  genderBox: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 10,
    margin: 5,
    padding: 3,
  },
  genderOption: {
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

export default connect(mapStateToProps, dispatchToProps)(EditProfile);
