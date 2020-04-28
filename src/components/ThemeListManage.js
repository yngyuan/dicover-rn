import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import ThemeDetailManage from "./ThemeDetailManage";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";


const ThemeListManage = ({ themes }) => {
    return (
        <View>
            <FlatList style={styles.list}
                showsHorizontalScrollIndicator={false}
				horizontal
                data={themes}
                keyExtractor={(theme) =>theme._id}
                renderItem={({ item })=>{
                    return (
                        <ThemeDetailManage theme={item}/>
                    );
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        marginTop: 0,
        marginBottom:20,
    }
});

export default ThemeListManage;