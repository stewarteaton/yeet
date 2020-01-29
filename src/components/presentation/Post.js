/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from '../../config';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  componentDidMount() {
    console.log('POST STATE: ' + this.state);
    console.log(this.props);
  }

  likeToggled() {
    this.setState({
      liked: !this.state.liked,
    });
  }

  render() {
    const imageHeight = Math.floor(Dimensions.get('window').width * 1.1);
    const imageUri = `https://res.cloudinary.com/yeetsoftware/image/upload/w_${config.styleConstants.screenWidth},h_${imageHeight},c_scale/countryForumPics/photo-1546484488-2a1430996887_hdgoti.jpg`;

    // heart icon color
    const heartIconColor = this.state.liked ? 'rgb(252,61,57)' : null;
    const heartToggleIcon = this.state.liked ? config.images.heartFullIcon : config.images.heartIcon;

    return (
      <View style={{width: 100 + '%', flex: 1, borderBottomWidth: 7, borderBottomColor: 'black'}}>
        <View style={styles.userBar}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri:
                  'https://res.cloudinary.com/dmgp6exro/image/upload/v1564460812/profile-pic.jpg',
              }}
              style={styles.userPic}
            />
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>Stewart Eaton</Text>
          </View>
          <View style={{alignItems: 'center', marginRight: 10}}>
            <Text style={{fontSize: 30}}>...</Text>
          </View>
        </View>

        {/* Post Message if present */}
        <View style={{width: 100 + '%'}}>
          <Text style={{fontSize: 18, paddingHorizontal: 5, paddingVertical: 10}}>Full send, eh?</Text>
        </View>
        {/* Post Image if present */}
        <TouchableOpacity onPress={()=>{ this.likeToggled(); }}  activeOpacity={0.8}>
          <Image source={{uri: imageUri}} style={{width: config.styleConstants.screenWidth, height: imageHeight}} />
        </TouchableOpacity>

        {/* Post Icon Bar */}
        <View style={styles.iconBar}>
          <View style={styles.iconAndText}>
            <Image style={[styles.icon, {height: 30, width:30, tintColor: heartIconColor }]} source={heartToggleIcon} />
            <Text>Like</Text>
          </View>
          <View style={styles.iconAndText}>
            <Image style={[styles.icon, {height: 30, width:30}]} source={config.images.chatIcon} />
            <Text>Comment</Text>
          </View>
          <View style={styles.iconAndText}>
            <Image style={[styles.icon, {height: 25, width:25}]} source={config.images.paperIcon} />
            <Text>Share</Text>
          </View>
        </View>
        <View style={styles.likesBar}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.likesTxt}>120 Likes</Text>
            <Text style={styles.likesTxt}>18 Comments</Text>
          </View>
          <View style={styles.daysAgo}>
            <Text style={styles.likesTxt}>3 days ago</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  iconBar: {
    height: config.styleConstants.rowHeight,
    width: 100 + '%',
    borderColor: 'rgb(233,233,233)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8 + '%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
  },
  icon: {
    marginHorizontal: 5,
  },
  likesTxt: {
    fontSize: 14,
    marginHorizontal: 6,
  },
  likesBar: {
    height: 30,
    width: 100 + '%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3.5 + '%',
    justifyContent: 'space-between',
  },
});

export default Post;
