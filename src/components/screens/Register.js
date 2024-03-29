/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
  ActivityIndicator,
} from 'react-native';
import yeetIcon from '../../images/social-icon.png';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  }

  componentDidMount(){
    console.log('REGISTER');
    console.log(this.props);
  };

  updateText(text, field) {
    // must assign object because nested
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials,
    });
  }

  registerUser() {
    console.log('REG FIRED');
    //check if passwords match & fields aren't empty
    const creds = this.state.credentials;
    if (creds.name === '' || creds.email === '' || creds.password !== creds.confirmPassword){
      Alert.alert(
        'Error',
        'Error, please try again',
        [
        {text: 'OK', onPress: () => console.log('Passwords do not match')},
        ],
        {cancelable: false},
      );
    } else {
    //send credentials to server
    this.props.loadingUI();
    fetch(config.baseUrl + '/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.credentials),
    })
    .then(response => response.json())
    .then(jsonResponse => {
        console.log(jsonResponse);
        if (jsonResponse.error != null){
            Alert.alert('Error', jsonResponse.error,
            [
                {text: 'OK', onPress: () => console.log(jsonResponse.error)},
                ],
                {cancelable: false},
            );
        }
        if (jsonResponse.confirmation === 'Success!'){
          this.props.clearUIErrors();
          Alert.alert(
          'Success',
          'Please log in now.',
          [
            {text: 'OK', onPress: () => console.log(jsonResponse)},
          ],
          {cancelable: false},
        );
            this.props.navigation.navigate('login');
        }
    })
    .catch(err => {
      console.log(err);
    });
    }
  }


  render() {
    const { UI: { loading }} = this.props;
    return (
      <View style={styles.view}>
        <View style={styles.topBackground}>
          <Text style={styles.yeetTitle}>Yeet</Text>
          <Image style={styles.icon} source={yeetIcon} />
          <Text style={styles.bio}>
            Sign up to meet travellers and share photos, experiences, and
            memories
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={{color: 'black', fontFamily: 'Georgia', fontSize: 33, marginBottom: 40 + '%'}}>
            Register
          </Text>
          <TextInput
            autoCapitalize="none"
            value={this.state.name}
            onChangeText={text => this.updateText(text, 'userName')}
            placeholder="Name"
            style={[styles.input, {position: 'absolute', top: 44 + '%'}]}
          />
          <TextInput
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={text => this.updateText(text, 'email')}
            placeholder="Email"
            style={[styles.input, {position: 'absolute', top: 52 + '%'}]}
          />
          <TextInput
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={text => this.updateText(text, 'password')}
            secureTextEntry
            placeholder="Password"
            style={[styles.input, {position: 'absolute', top: 62 + '%'}]}
          />
          <TextInput
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={text => this.updateText(text, 'confirmPassword')}
            secureTextEntry
            placeholder="Confirm Password"
            style={[styles.input, {position: 'absolute', top: 70 + '%'}]}
          />

          <TouchableOpacity style={[styles.register, {position: 'absolute', top:78 + '%' }]}  onPress={() => { this.registerUser(); }}>
            <Text style={{color: 'white', fontFamily: 'Georgia', fontSize: 24}}>
              Sign Up!
            </Text>
            {loading && <View style={styles.spinner} pointerEvents={'none'}>
                          <ActivityIndicator size="large" color="#0000ff" style={{ zIndex: 2}}/>
                        </View>}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.signIn, {position: 'absolute', bottom: 10 + '%' }]}
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={{color: 'blue', fontFamily: 'Georgia', fontSize: 18}}>
              Already a user? Sign In Here
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    height: 100 + '%',
    width: 100 + '%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgb(118,72,150)',
    // paddingLeft: 5 + '%',
    // paddingRight: 5 + '%',
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    bottom: 65 + '%',
    flex: 1,
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.themeColor,
    paddingLeft: 2 + '%',
    paddingRight: 2 + '%',
  },
  yeetTitle: {
    position: 'absolute',
    top: 5 + '%',
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 50,
    // fontFamily: 'Futura-Medium',
    fontFamily: 'Georgia-Bold',
    // fontFamily: 'Papyrus',
    fontWeight: '600',
    color: 'white',
  },
  icon: {
    width: 19 + '%',
    height: 30 + '%',
    position: 'absolute',
    top: 30 + '%',
  },
  bio: {
    position: 'absolute',
    top: 70 + '%',
    fontSize: 21,
    fontFamily: 'Georgia',
    color: 'white',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2 + '%',
    paddingRight: 2 + '%',
  },
  input: {
    height: 50,
    width: 100 + '%',
    paddingHorizontal: 50,
    backgroundColor: 'rgb(210, 210, 210)',
    borderRadius: 10,
    borderColor: 'rgb(55, 55, 55)',
    borderWidth: 2,
    fontSize: 20,
    fontFamily: 'Georgia',
  },
  register: {
    height: 50,
    width: 100 + '%',
    backgroundColor: 'rgb(62,152,236)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    state: state,
    UI: state.UI,
  };
};

export default connect(mapStateToProps)(Register);
