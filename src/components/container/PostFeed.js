/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Post} from '../presentation/Post';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {getPosts} from '../../redux/actions/dataActions';
import config from '../../config';

class PostFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getPosts();
  }

  _renderPost({item}) {
    return <Post item={item} />;
  }
  _returnKey(item) {
    return item.createdAt.toString();
  }
  render() {
    const {posts, loading} = this.props.data;

    let recentPostsMarkup = !loading ? (
      <FlatList
        data={posts}
        keyExtractor={this._returnKey}
        renderItem={this._renderPost}
      />
    ) : (
      // Need to make skeleton
      // <ShoutSkeleton />
      <View pointerEvents={'none'} style={{marginTop: 30 + '%'}}>
        <ActivityIndicator size="large" color="#0000ff" style={{zIndex: 2}} />
      </View>
    );
    return (
      <View style={{width: 100 + '%', flex: 1}}>
        {/* Render data from Flatlist passed into individual post layouts */}
        {recentPostsMarkup}
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

export default connect(
  mapStateToProps,
  {getPosts},
)(PostFeed);
