/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import config from '../../config';
import axios from 'axios';
import {connect} from 'react-redux';

class Camera extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Camera');
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const picData = await this.camera
        .takePictureAsync(options)
        .catch(error => {
          console.log(error);
        });
      console.log(picData);
      var cloudURL;
      await axios
        .post(`/cloudinary/${this.props.user.account.uid}/photo`, picData)
        .then(response => {
          console.log('worked');
          console.log(response.data.url);
          cloudURL = response.data.url;
        })
        .catch(error => {
          console.log('did not work');
          console.log(error);
        });

      // Add url to Firebase
      await axios
        .post(`/users/${this.props.user.account.uid}/photo`, {
          url: cloudURL,
        })
        .then(response => {
          console.log('fire url worked');
          console.log(response);
          const myjson = response.data;
          const {data} = myjson;

          this.props.navigation.navigate('profile', {
            newPic: data,
          });
        })
        .catch(error => {
          console.log('did not work');
          console.log(error);
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapStateToProps = state => {
  return {
    user: state,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, dispatchToProps)(Camera);
// export default Camera;
