import React, {useContext} from 'react';
import { useState } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import network from "../api/network";
import Toast from 'react-native-root-toast';
import {Context as AuthContext} from "../context/AuthContext";

const ThemeDetail = ({ theme }) => {
    const [subscribe_clicked, setSubscribe_clicked] = useState('1');
    const [errorMessage, setErrorMessage] = useState("");
    const {state} = useContext(AuthContext);
    const uid = state.uid;
    // t_coverimage
    // t_name
    // t_description
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: theme.t_coverimage}} />
            <Text style={styles.name}>{theme.t_name}</Text>
            <Text style={styles.text}> {theme.t_description}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={
                    async () => {
                        try {
                            const response = await network.post('/viewOneMobile', {
                                uid: uid,
                                t_name: theme.t_name,
                                subscribe_clicked: subscribe_clicked,
                            });
                            setSubscribe_clicked(response.data.subscribe_clicked);
                            // Alert.alert("Subscribed");
                            // Add a Toast on screen.
                            let toast = Toast.show('Subscribed', {
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.CENTER,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                            setTimeout(function () {
                                Toast.hide(toast);
                            }, 600);
                            console.log(`clicked ${theme.t_name}`);
                        } catch (e) {
                            setErrorMessage('Something went wrong.');
                        }
                    }
                }
            >
                <Text style={styles.buttonText}> Subscribe </Text>
            </TouchableOpacity>

            <View
                style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    marginLeft: 5,
                    marginRight: 5,
                    marginBottom: 10,
                }}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#d6d7da',
        paddingTop: 10,
        paddingBottom:10
    },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        borderRadius: 4,
        marginBottom: 5,
    },

    name: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingLeft: 44,
    },

    text:{
        fontSize: 18,
        paddingLeft: 42,
    },

    button: {
        height: 50,
        width: 300,
        alignSelf:'center',
        alignItems: 'center',
        backgroundColor: '#9be3de',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        marginRight: 10,
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ThemeDetail;