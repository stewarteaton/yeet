import {Dimensions} from 'react-native';

export default {
  baseUrl: 'http://localhost:5000/yeet-7b4b7/us-central1/api',
  // baseUrl: "https://us-central1-yeet-7b4b7.cloudfunctions.net/api",

  themeColor: 'rgb(62,152,236)',

  images: {
    heartIcon: require('../images/assets/heart.png'),
    chatIcon: require('../images/assets/chat.png'),
    paperIcon: require('../images/assets/paper-plane.png'),
    heartFullIcon: require('../images/assets/heartFull.png'),
  },
  styleConstants: {
    rowHeight: 50,
    oneThirdWidth: Dimensions.get('window').width / 3,
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
  },
  fontFamilies: {
    futuraMedium: 'Futura-Medium',
    georgiaBold: 'Georgia-Bold',
    papyrus: 'Papyrus',
  },
};
