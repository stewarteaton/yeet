import React from 'react';
import {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

// import {Login, Register, MainFeed} from './components/screens';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import MainFeed from './components/screens/MainFeed';
import ThailandFeed from './components/screens/ThailandFeed';
import Camera from './components/screens/Camera';
import ChatFeed from './components/screens/ChatFeed';
import Profile from './components/screens/Profile';
import EditProfile from './components/screens/EditProfile';

import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import config from './config';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';

const TabScreens = createBottomTabNavigator(
  {
    feed: {
      screen: createStackNavigator({
        worldFeed: {screen: MainFeed},
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
          iconName = 'globe-americas';
        }
        if (routeName === 'profile') {
          iconName = 'user-circle';
        } else if (routeName === 'camera') {
          iconName = 'camera';
        } else if (routeName === 'chat') {
          iconName = 'comments';
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
    initialRouteName: 'login',
  },
);

const AppContainer = createAppContainer(MainStack);

class YEET extends Component {
  render() {
    return <AppContainer />;
  }
}

export default YEET;
