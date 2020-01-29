/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Post} from '../presentation/Post';
import {FlatList, ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import { getPosts } from '../../redux/actions/dataActions';
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
    const { posts, loading } = this.props.data;

    // let recentPostsMarkup = !loading? (
    //     <Text>Finished Loading</Text>
    // ) : (
    //     <Text>STILL loading</Text>
    // );
    let recentPostsMarkup = !loading ? (
      <FlatList data={posts}
        keyExtractor={this._returnKey}
        renderItem={this._renderPost}
      />
    ) : ( 
    // Need to make skeleton 
    // <ShoutSkeleton />
    <View pointerEvents={'none'} style={{marginTop: 30 + '%'}}>
      <ActivityIndicator size="large" color="#0000ff" style={{ zIndex: 2}}/>
    </View>
    );
    return (
     <View style={{width: 100 + '%', flex: 1}}>
       <View style={styles.postButton}>
          <Text style={{fontSize: 48, color: 'white'}}>+</Text>
       </View>
      {recentPostsMarkup}
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
    justifyContent: 'center',
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

export default connect(mapStateToProps, {getPosts})(PostFeed);
