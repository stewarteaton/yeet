import {Dimensions} from 'react-native';

export default {
  baseUrl: 'http://localhost:5000/yeet-7b4b7/us-central1/api',
  // baseUrl: "https://us-central1-yeet-7b4b7.cloudfunctions.net/api",

  themeColor: 'rgb(62,152,236)',

  styleConstants: {
    rowHeight: 50,
    oneThirdWidth: Dimensions.get('window').width / 3,
    screenWidth: Dimensions.get('window').width,
  },
};
