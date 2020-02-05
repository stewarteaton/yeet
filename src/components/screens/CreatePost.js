import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postBody: '',
      postImg: 'https://images.unsplash.com/photo-1573945916989-85e23bae8549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      keyboardBtnVisible: false,
    };
  }

  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerRight: (
      <TouchableOpacity
        style={{paddingRight: 20}}
        onPress={() => alert('This is a button!')}>
        <Text style={{fontSize: 20, color: 'white'}}>Post</Text>
      </TouchableOpacity>
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

  chooseImg = event => {
    console.log(event);
    var obj = this.state;
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        obj.postImg = response.uri;
        this.setState(obj);
      }
    });
  };

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
            var obj = this.state;
            obj.postImg = '';
            this.setState(obj);
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={85}
        style={styles.container}>
        <ScrollView>
          {/* User Nav Bar */}
          <View style={styles.userBar}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: `${this.props.user.profilePictures[0].url}`,
                }}
                style={styles.userPic}
              />
              <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
                {this.props.user.userName}
              </Text>
            </View>
            <View style={{alignItems: 'center', marginRight: 10}}>
              <Text style={{fontSize: 30}}>...</Text>
            </View>
          </View>

          {/* Post Message Box */}
          <View style={styles.postMessage}>
            <TextInput
              multiline={true}
              numberOfLines={15}
              style={styles.postInput}
              value={this.state.postBody}
              onChangeText={text => this.updateText(text, 'postBody')}
              placeholder="Write Something"
            />
            {/* Check if Image has been chosen by user */}
            {this.state.postImg !== '' && 
              <View>
                <TouchableOpacity style={styles.deleteIcon} onPress={() => this.deleteImg()}>
                  <Image style={{height: 40, width:40}} source={config.images.deleteIcon}/>
                </TouchableOpacity>
                  <Image source={{uri: this.state.postImg}} style={styles.postImg}/> 
              </View>
            }
          </View>

        </ScrollView>
        <View style={styles.keyBoardBtns}>
            <TouchableOpacity>
                <Image style={{height: 40, width:40, tintColor: config.themeColor}} source={config.images.cameraIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.chooseImg()}>
                <Image style={{height: 40, width:40, tintColor: config.themeColor}} source={config.images.galleryIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{fontSize: 22, color: config.themeColor, fontWeight: 'bold'}}>GIFF</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userBar: {
    width: 100 + '%',
    height: config.styleConstants.rowHeight,
    backgroundColor: 'rgb(200,200,200)',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  userPic: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  postMessage: {
    width: 100 + '%',
    marginTop: 15,
  },
  postInput: {
    fontSize: 18,
    padding: 10,
  },
  keyBoardBtns: {
    height: 50,
    // backgroundColor: 'orange',
    backgroundColor: 'rgb(240,240,240)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10 + '%',
  },
  postImg: {
    width: config.styleConstants.screenWidth,
    height: config.styleConstants.screenWidth,
  },
  deleteIcon: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: 10,
  }
});

const mapStateToProps = state => {
  return {
    user: state.account,
    UI: state.UI,
    data: state.data,
  };
};

export default connect(mapStateToProps)(CreatePost);
