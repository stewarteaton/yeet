import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text} from 'react-native';
import PostFeed from '../container/PostFeed';
// import userActions from '../../redux/actions/userActions';
// import dataActions from '../../redux/actions/dataActions';
import { getPosts } from '../../redux/actions/dataActions';


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

//   componentDidMount() {
//     this.props.getPosts();
//     console.log(this.props);
//   }

  render() {
    // const { posts, loading } = this.props.data;

    // let recentPostsMarkup = !loading ? (
    //     posts.map((post) => <Shout key={shout.shoutID} shout={shout}/>)
    // ) : ( <ShoutSkeleton />);
    return (
      <View style={{width: 100 + '%', flex: 1}}>
        <PostFeed />
      </View>
    );
  }
}

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

export default connect(mapStateToProps, {getPosts})(MainFeed);
