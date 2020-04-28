import React, {Component, useContext, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import ThemeListManage from "../components/ThemeListManage";
import ReportListManage from "../components/ReportListManage";
import manage from "../hooks/useManage";
import { Context as AuthContext } from '../context/AuthContext';
import { Divider } from 'react-native-elements';
import {MaterialIcons} from "@expo/vector-icons";

const ManageScreen = props => {
    const [manageApi, themes, reports, errorMessage] = manage();
    const { signout } = useContext(AuthContext);
    const {state} = useContext(AuthContext);
    const uid = state.uid;

	return(
	  <ScrollView style={styles.container} >
		{ errorMessage ? <Text>{ errorMessage }</Text> : null }
		<View style={styles.refreshLayout} >
		<Text style={styles.name}>My Status</Text>
          <TouchableOpacity
              style={styles.refreshButton}
              onPress={()=>{manageApi();}}
          >
          <Text style={styles.buttonText}> refresh</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.status1}>
            <View style={styles.status} >
              <MaterialIcons name="person-outline" size={21}/>
              {/*TODO show actual username and likes*/}
              <Text style={styles.text} >{uid.toString().slice(0,4)}</Text>
            </View>
            <Text style={styles.text1} >Total likes: 756</Text>
          </View>
          <Divider style={styles.divider} />
		<Text style={styles.name}>My Reports</Text>
		<ReportListManage reports ={reports} />
          <Divider style={styles.divider} />
		<Text style={styles.name}>Subscribed Themes</Text>
		<ThemeListManage themes ={themes} />
          <Divider style={styles.divider} />
		<TouchableOpacity
			style={styles.button}
			onPress={signout}
		>
			<Text style={styles.buttonText}> Signout</Text>
		</TouchableOpacity>
	  </ScrollView>
	)
 };
 
const styles = StyleSheet.create({
    container: {
        marginLeft: -10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
    },
    status: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginRight:10,
        marginTop: 20,
    },
    status1: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 10,
        marginTop: 10,
    },
    text:{
        fontSize: 18,
    },
    text1:{
        fontSize: 18,
        marginTop:20,
        marginRight: 5
    },
    button: {
        height: 50,
        width: 300,
        alignSelf:'center',
        alignItems: 'center',
        backgroundColor: '#ff0000',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
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
    divider: {
        backgroundColor: '#d6d7da',
        marginTop: 5
    },
    refreshLayout: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});
 
export default ManageScreen;
