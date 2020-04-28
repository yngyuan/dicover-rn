import React, {Component} from 'react';
import { View, Image, ScrollView } from 'react-native';

const LastPhotoTaken = props => {
  return (
    <View>
    {
      props.lastCapture &&
      <Image source={{ uri: props.lastCapture.uri }}
             style={{ width: 60, height: 70 }}/>
    }
  </View>
  );
};

export default LastPhotoTaken;
