import React, {Component} from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import ReportDetail from "./ReportDetail";
import axios from 'axios';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  

const ReportList = ({reports}) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <View>
            <FlatList style={styles.list}
                showVerticalScrollIndicator={true}
                
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }

                data={reports}
                keyExtractor={(report) => report._id}
                renderItem={({ item })=>{
                    return (
                        <ReportDetail report={item}/>
                    );
                }}
            />

                
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        marginTop: 50,
        marginBottom:0,
    }
});

export default ReportList;
