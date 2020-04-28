import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import instance from "../api/network";
import ReportList from "../components/ReportList";
import subscribe from "../hooks/subscribe"



const SubscribeScreen = ({navigation}) => {
    const[subscribeAPI, reports, errorMessage] = subscribe();
    
      return(
        <View style={styles.container}>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={()=>{subscribeAPI();}}
            >
                <Text style={styles.buttonText}> refresh</Text>
            </TouchableOpacity>
            { errorMessage ? <Text>{ errorMessage }</Text> : null }
            <ReportList reports ={reports}/>
        </View>
      )
    
  };

const styles = StyleSheet.create({
    container: {
        marginLeft: -10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 10,
        marginTop: 20,
    },
    text:{
        fontSize: 18,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    refreshButton: {
        height: 40,
        width: 90,
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#9be3de',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
});

export default SubscribeScreen;

