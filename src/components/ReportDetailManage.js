import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, Share} from 'react-native';
import network from "../api/network";
import {Card} from 'react-native-elements';

const ReportDetailManage = ({ report }) => {
    // r_url
    // r_title
    // r_tname
    // r_time
    // r_description
	const timeArr = report.r_time.split('.');
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: report.r_url}} />
            <Text style={styles.tag}>{report.r_title}</Text>
            <Text style={styles.themetitle}>{report.r_tname}</Text>
            <Text style={styles.time}>{timeArr[0]}</Text>
            <Text style={styles.text}> {report.r_description}</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={async ()=> {
					try {
						// const uid = "5d8eda3ee1b75277bae9e187";
						const response = await network.post('/shareMobile', {
							uri : report.r_url,
							description: report.r_description
						});
						// Alert.alert("text has been appended to image! ");
                        // console.log(response);
                        const b64 = 'data:image/jpeg;base64,'.concat(response.data.image.slice(2,-1));

                        // console.log(b64);//

                        const result = await Share.share({
                            message:
                                '',
                            title: 'My Quotes'  ,
                            url: b64,
                        });
                        if (result.action === Share.sharedAction) {
                            if (result.activityType) {
                                // shared with activity type of result.activityType
                            } else {
                                // shared
                                Alert.alert("Shared");
                            }
                        } else if (result.action === Share.dismissedAction) {
                            // dismissed
                            Alert.alert("User Dissmissed");
                        }
						//report.r_url = response.data.image_original_url;

					} catch (e) {
						console.log("reportDetailManage : " + e.message);
					}
					
				}}

			>
				<Text style={styles.buttonText}> Share</Text>
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
        marginLeft: 10,
    },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        borderRadius: 4,
        marginBottom: 5,
    },
    time:{
        fontSize: 10,
        color: 'grey',
    },

    tag:{
        fontSize: 16,
        color: '#b790ff',
    },

    themetitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#a582d9',
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

export default ReportDetailManage;