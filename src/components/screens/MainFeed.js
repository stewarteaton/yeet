import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PostFeed from '../container/PostFeed';
import {getPosts} from '../../redux/actions/dataActions';

export class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Feed',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  };

  render() {
    return (
      <View style={{width: 100 + '%', flex: 1}}>
        {/* Floating Button that allows user to POST */}
        <View style={styles.postButton}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('createPost')}>
            <Text style={{fontSize: 48, color: 'white', marginTop: 3}}>+</Text>
          </TouchableOpacity>
        </View>

        <PostFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postButton: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    right: 40,
    backgroundColor: config.themeColor,
    width: 70,
    height: 70,
    borderRadius: 35,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.account,
    UI: state.UI,
    data: state.data,
  };
};

// const dispatchToProps = dispatch => {
//   return {
//     loadingUI: () => dispatch(userActions.loadingUI()),

//   };
// };

export default connect(
  mapStateToProps,
  {getPosts},
)(MainFeed);
