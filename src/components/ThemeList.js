import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import ThemeDetail from "./ThemeDetail";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";


const ThemeList = ({ themes }) => {
    return (
        <View>
            <FlatList style={styles.list}
                showVerticalScrollIndicator={true}
                data={themes}
                keyExtractor={(theme) =>theme._id}
                renderItem={({ item })=>{
                    return (
                        <ThemeDetail theme={item}/>
                    );
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        marginTop: 0,
        marginBottom:80,
    }
});

export default ThemeList;