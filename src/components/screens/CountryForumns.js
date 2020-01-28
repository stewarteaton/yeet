import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const CONTINENT_OPTIONS = ['SE Asia', 'Europe', 'South America', 'North America']

export class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [['C', 'Java', 'JavaScript', 'PHP'],['as','df']],
    };
  }

  static navigationOptions = {
    title: 'Travel Forums',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerLeft: (
      <ModalDropdown options={CONTINENT_OPTIONS} style={{backgroundColor: config.themeColor, width: 100, height: 100 + '%', borderRadius: 10}}
        textStyle={{color:'white', fontSize: 30}}/>
    ),
  };

  componentDidMount() {
    console.log(this.props);
    console.log(this.state.data);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.scrollContainer}>
          <TouchableOpacity
            style={styles.countryOption}
            onPress={() => this.props.navigation.navigate('thailandFeed')}>
            <ImageBackground
              source={{
                uri: `https://res.cloudinary.com/yeetsoftware/image/upload/w_${
                  config.styleConstants.screenWidth
                },h_180,c_scale/countryForumPics/photo-1528181304800-259b08848526_hm71ke.jpg`,
              }}
              style={{
                width: config.styleConstants.screenWidth,
                height: 100 + '%',
              }}>
              <View style={styles.imgCover}>
                <Text style={styles.countryName}>Thailand</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          {/* Bali */}
          <TouchableOpacity
            style={styles.countryOption}
            onPress={() => this.props.navigation.navigate('thailandFeed')}>
            <ImageBackground
              source={{
                uri: `https://res.cloudinary.com/yeetsoftware/image/upload/w_${
                  config.styleConstants.screenWidth
                },h_180,c_scale/countryForumPics/photo-1546484488-2a1430996887_hdgoti.jpg`,
              }}
              style={{
                width: config.styleConstants.screenWidth,
                height: 100 + '%',
              }}>
              <View style={styles.imgCover}>
                <Text style={styles.countryName}>Bali</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          {/* Japan */}
          <TouchableOpacity
            style={styles.countryOption}
            onPress={() => this.props.navigation.navigate('thailandFeed')}>
            <ImageBackground
              source={{
                uri: `https://res.cloudinary.com/yeetsoftware/image/upload/w_${
                  config.styleConstants.screenWidth
                },h_180,c_scale/countryForumPics/photo-1526481280693-3bfa7568e0f3_vwiqzy.jpg`,
              }}
              style={{
                width: config.styleConstants.screenWidth,
                height: 100 + '%',
              }}>
              <View style={styles.imgCover}>
                <Text style={styles.countryName}>Japan</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          {/* Vietnam */}
          <TouchableOpacity
            style={styles.countryOption}
            onPress={() => this.props.navigation.navigate('thailandFeed')}>
            <ImageBackground
              source={{
                uri: `https://res.cloudinary.com/yeetsoftware/image/upload/w_${
                  config.styleConstants.screenWidth
                },h_180,c_scale/countryForumPics/photo-1528127269322-539801943592_yuzssm.jpg`,
              }}
              style={{
                width: config.styleConstants.screenWidth,
                height: 100 + '%',
              }}>
              <View style={styles.imgCover}>
                <Text style={styles.countryName}>Vietnam</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: 100 + '%',
    height: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 'auto',
  },
  countryOption: {
    width: 100 + '%',
    height: 180,
    borderRadius: 10,
    margin: 1,
    backgroundColor: 'black',
  },
  imgCover: {
    flex: 1,
    // backgroundColor: 'rgba(114, 99, 248, 0.4)',
    // backgroundColor: 'rgba(62,152,236,.4)',
    backgroundColor: 'rgba(80,80,80, 0.35)',
    borderRadius: 10,
  },
  countryName: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Georgia-bold',
    margin: 14,
  },
  dropContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  dropDownBox: {
    backgroundColor: 'pink',
  },
});

const mapStateToProps = state => {
  return {
    user: state.account,
    UI: state.UI,
  };
};

const dispatchToProps = dipatch => {
  return {};
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(MainFeed);
