/* eslint-disable react-native/no-inline-styles */
'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const App = () => {
  const cameraRef = React.useRef();
  React.useEffect(() => {
    const getPictures = async () => {
      let options = {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality['288p'],
      };
      const data = await cameraRef.current.recordAsync(options);
      if (data) {
        console.log('taking video', data);
        setInterval(async () => {
          const finalData = await cameraRef.current.stopRecording();
          console.log(finalData, 'final Data');
        }, 5000);
      }
      console.log(data?.uri, 'data');
    };

    getPictures();
  }, []);

  React.useEffect(()=> {
    const getPictures = async () => {
      let options = {
        quality: 1,
        base64: true,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data?.uri, 'data');
    };

    getPictures();

    setInterval(() => {
      getPictures();
    }, 500);
  }, []);

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );

  const takePicture = async () => {
    if (cameraRef) {
      let options = {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality['288p'],
      };
      console.log('i am here');
      const data = await cameraRef.current.recordAsync(options);
      console.log(data.uri);
      if (data) {
        console.log('taking video', data);
        setInterval(async () => {
          const finalData = await cameraRef.current.stopRecording();
          console.log(finalData, 'final Data');
        }, 5000);
      }
      console.log(data?.uri, 'data');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        playSoundOnCapture={false}
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
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') {
            return <PendingView />;
          }
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

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

export default App;
