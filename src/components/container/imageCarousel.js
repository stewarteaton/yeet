import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config';

import Carousel from 'react-native-snap-carousel';
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

export class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [{url: 'https://images.unsplash.com/photo-1516069213778-f52c5ac638fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'},{url: 'https://images.unsplash.com/photo-1516069213778-f52c5ac638fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}],
    };
  }

  componentDidMount() {
    console.log('IMAGE CARO');
    console.log(this.props);
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.slide}>
     {/* <Image style={styles.img} source={{uri: 'https://images.unsplash.com/photo-1516069213778-f52c5ac638fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} /> */}
        <Image style={styles.image} source={{uri: item.url}} />
      </View>
    );
  }

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={this.props.images}
        renderItem={this._renderItem}
        sliderWidth={config.styleConstants.screenWidth}
        itemWidth={config.styleConstants.screenWidth}
      />
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 30,
  },
  image: {
    height: config.styleConstants.screenWidth,
    width: 100 + '%',
  },
});

const mapStateToProps = state => {
  return {
    state: state,
  };
};

const dispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, dispatchToProps)(ImageCarousel);