import React, {Component} from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';

const LastPhotoTakenUri = props => {
  return (
    <View>
    {
      props.lastCapture &&
      <Image source={{ uri: props.lastCapture }}
             style={ photoStyle.dstStyle }/>
    }
  </View>
  );
};

const photoStyle = StyleSheet.create(
  {
    dstStyle: {
      width: 300,
      height: 350,
    }
  }
);

export default LastPhotoTakenUri;
