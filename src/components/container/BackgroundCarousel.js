import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import config from '../../config';

class BackgroundCarousel extends React.Component {
  // scroll ref only needed if want to loop through
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  setSelectedIndex = event => {
    // width of view size
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    // get current position of scroll view
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize);
    this.setState({selectedIndex});
  };

  render() {
    const {images} = this.props;
    const {selectedIndex} = this.state;
    return (
      <View style={{height: 100 + '%', width: 100 + '%'}}>
        <ScrollView horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex}>
          {images.map(image => (
            <Image key={image.url} source={{uri: image.url}} style={styles.backgroundImg} />
          ))}
        </ScrollView>
        <View style={styles.circleDiv}>
            {images.map((image, i) => (
              <View key={image.url} style={[styles.whiteCircle, {opacity: i === selectedIndex ? 1 : 0.5} ]} />
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    height: config.styleConstants.screenWidth,
    width: config.styleConstants.screenWidth,
  },
  circleDiv: {
    // backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    height: 30,
    width: 100 + '%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'white',
  },
});

export {BackgroundCarousel};
