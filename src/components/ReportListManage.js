import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import ReportDetailManage from "./ReportDetailManage";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";


const ReportListManage = ({ reports }) => {
    return (
        <View>
            <FlatList style={styles.list}
                showsHorizontalScrollIndicator={false}
				horizontal
                data={reports}
                keyExtractor={(report) =>report._id}
                renderItem={({ item })=>{
                    return (
                        <ReportDetailManage report={item}/>
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

export default ReportListManage;