import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';


const ThemeDetailManage = ({ theme }) => {
    // t_coverimage
    // t_name
    // t_description
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: theme.t_coverimage}} />
            <Text style={styles.name}>{theme.t_name}</Text>
            <Text style={styles.text}> {theme.t_description}</Text>

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
        marginLeft: 10,
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
    },

    text:{
        fontSize: 18,
    },

    button: {
        height: 50,
        width: 280,
        alignSelf:'center',
        alignItems: 'center',
        backgroundColor: '#faeee7',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        marginRight: 10,
    },

    buttonText: {
        color: '#ff8ba7',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ThemeDetailManage;