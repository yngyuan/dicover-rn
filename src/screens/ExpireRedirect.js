import React from 'react';
import {Modal, View, StyleSheet, Text, Button} from 'react-native';



const ExpireRedirect = props => {
  return (
      <View style={style.container}>
        <Text style={style.textStyle}>
          Login Expired
        </Text>
        <Button
          title="Redirect to login page"
          onPress={function () {
          props.navigation.navigate("loginFlow");
        }}/>
      </View>
  );
};

export default ExpireRedirect;

const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 10,
    }
  }
);