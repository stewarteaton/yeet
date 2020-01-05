/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import actions from '../../redux/actions';
import config from '../../config/index';
import {connect} from 'react-redux';

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
import yeetIcon from '../../images/social-icon.png';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        email: '',
        password: '',
      },
    };
  }

  componentDidMount(){
    console.log(this.props);
  }

  updateText(text, field) {
    // must assign object because nested
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials,
    });
  }

  login(){
      //send credentials to server
      fetch(config.baseUrl + '/login', {
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
              // dispatch user data to redux store
              console.log(jsonResponse);
              this.props.userRecieved(jsonResponse);
              this.props.navigation.navigate({routeName: 'main'});
          }
      })
      .catch(err => {
          console.log(err);
      });
  }


  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.yeetTitle}>Yeet</Text>
        <Image style={styles.icon} source={yeetIcon} />
        <TextInput
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={text => this.updateText(text, 'email')}
          placeholder="Email"
          style={[styles.input, {position: 'absolute', top: 30 + '%'}]}
        />
        <TextInput
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={text => this.updateText(text, 'password')}
          secureTextEntry
          placeholder="Password"
          style={[styles.input, {position: 'absolute', top: 40 + '%'}]}
        />

        <TouchableOpacity
          style={[styles.forgotPassword, {position: 'absolute', top: 46 + '%'}]}
          onPress={() => this.props.navigation.navigate('register')}>
          <View style={styles.forgotPassView}>
            <Text style={{color: 'blue',  textAlign: 'right', flex: 1, paddingTop: 10}}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.login, {position: 'absolute', top: 55 + '%'}]}
          onPress={() => { this.login(); }}>
          <Text style={{color: 'white', fontSize: 20}}>
            Log In
          </Text>
        </TouchableOpacity>

        <View style={[styles.spaceOr, {position: 'absolute', top: 65 + '%'}]} >
          <Text style={styles.spaceOrText}>OR</Text>
        </View>

        <TouchableOpacity
          style={[styles.register, {position: 'absolute', top: 75 + '%'}]}
          onPress={() => this.props.navigation.navigate('register')}>
          <Text style={{color: 'white', fontSize: 20}}>
            Don't have an account? Sign Up!
          </Text>
        </TouchableOpacity>

      </View>
    );
  }d
}

const styles = StyleSheet.create({
  view: {
    height: 100 + '%',
    width: 100 + '%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgb(118,72,150)',
    paddingLeft: 5 + '%',
    paddingRight: 5 + '%',
  },
  yeetTitle: {
    position: 'absolute',
    top: 5 + '%',
    marginBottom: 0, paddingBottom: 0,
    fontSize: 50,
    // fontFamily: 'Futura-Medium',
    fontFamily: 'Georgia-Bold',
    // fontFamily: 'Papyrus',
    fontWeight: '600',
    color: 'black',
  },
  icon: {
    width: 20 + '%',
    height: 10 + '%',
    position: 'absolute',
    top: 15 + '%',
  },
  input: {
    height: 50,
    width: 100 + '%',
    paddingHorizontal: 20,
    backgroundColor: 'rgb(210, 210, 210)',

    borderRadius: 10,
    borderColor: 'rgb(55, 55, 55)',
    borderWidth: 2,
    fontSize: 20,
    fontFamily: 'Georgia',
  },
  forgotPassword: {
    // backgroundColor: 'rgb(62,152,236)',
    width: 100 + '%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  forgotPassView: {
    width: 100 + '%',
    height: 50,
    flex: 1,
    flexDirection: 'row',
  },
  login: {
    backgroundColor: 'rgb(62,152,236)',
    width: 100 + '%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  register: {
    backgroundColor: 'rgb(62,152,236)',
    width: 100 + '%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceOr: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  return {
    state: state,
  };
};

const dispatchToProps = dispatch => {
  return {
    userRecieved: (user) => dispatch(actions.userRecieved(user)),
  };
};

export default connect(mapStateToProps, dispatchToProps)(Login);
