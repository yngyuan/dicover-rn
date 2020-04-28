import React from 'react';
import {View, StyleSheet, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';


const SearchBar = ({term, onTermChange, onTermSubmit}) =>{
    return(
        <View style={styles.backgroundStyle}>
            <Feather name={"search"} style={styles.iconStyle}/>
            <TextInput
                autoCaptalize={"none"}
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder={"search"}
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    backgroundStyle: {
        width: 200,
        marginTop: 20,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom:5,
        flexDirection: 'row',
    },

    inputStyle: {
        flex: 1,
        fontSize: 18
    },

    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    }

});

export default SearchBar;