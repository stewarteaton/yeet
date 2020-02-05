import React from 'react';
import {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

// import {Login, Register, MainFeed} from './components/screens';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import MainFeed from './components/screens/MainFeed';
import CountryForumns from './components/screens/CountryForumns';
import CreatePost from './components/screens/CreatePost';
import ThailandFeed from './components/container/Thailand';
import Camera from './components/screens/Camera';
import ChatFeed from './components/screens/ChatFeed';
import Profile from './components/screens/Profile';
import EditProfile from './components/screens/EditProfile';

import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  TabBar,
} from 'react-navigation';
import config from './config';
//Icon
import {Image, View} from 'react-native';
import yeetIcon from '../src/images/social-icon.png';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';

const TabScreens = createBottomTabNavigator(
  {
    feed: {
      screen: createStackNavigator({
        recentFeed: {screen: MainFeed},
        createPost: {
          screen: CreatePost,
          navigationOptions: {
            tabBarVisible: false,
          },
        },
      }),
    },
    forumns: {
      screen: createStackNavigator({
        worldFeed: {screen: CountryForumns},
        thailandFeed: {screen: ThailandFeed},
      }),
    },
    camera: Camera,
    chat: ChatFeed,
    profile: {
      screen: createStackNavigator({
        profile: {screen: Profile},
        editProfile: {screen: EditProfile},
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let AwesomeIcon = FontAwesome;
        let iconName;
        if (routeName === 'feed') {
          // return <Image style={{width: 50 + '%'}} source={yeetIcon} />;
          return (
            <Image
              source={require('./images/social-icon.png')}
              style={{
                height: 40,
                width: 40,
                backgroundColor: 'grey',
                borderRadius: 5,
              }}
              color={tintColor}
            />
          );
        }
        if (routeName === 'forumns') {
          iconName = 'globe-americas';
        }
        if (routeName === 'profile') {
          iconName = 'user-alt';
        } else if (routeName === 'camera') {
          // iconName = 'camera-retro';
          return <Image style={{height: 40, width:40, tintColor: 'white'}} source={config.images.cameraIcon}/>
        } else if (routeName === 'chat') {
          iconName = 'sms';
        }

        // You can return any component that you like here!
        return <AwesomeIcon name={iconName} size={40} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: config.themeColor,
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 20,
      },
      style: {
        backgroundColor: 'black',
      },
    },
  },
);

const IntroStack = createStackNavigator({
  login: {screen: Login},
  register: {screen: Register},
});

const MainStack = createSwitchNavigator(
  {
    login: IntroStack,
    main: TabScreens,
  },
  {
    // initialRouteName: 'login',
    initialRouteName: 'main',
  },
);

const AppContainer = createAppContainer(MainStack);

class YEET extends Component {
  render() {
    return <AppContainer />;
  }
}

export default YEET;
