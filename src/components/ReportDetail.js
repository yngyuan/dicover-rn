import React from 'react';
import { useState, useContext } from 'react';
import {Text, View, StyleSheet, Image, Alert, Button} from 'react-native';
import {Card} from 'react-native-elements';
import { FontAwesome, MaterialIcons, AntDesign} from '@expo/vector-icons';
import network from "../api/network";
import { ToggleButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import {Context as AuthContext} from "../context/AuthContext";


const ReportDetail = ({report}) => {
    //let likeStatus = false;
    // if(report.r_like_list.includes('5dbefa7d35a29737ccffd80e')){
    //     likeStatus = true;
    // }
    const {state} = useContext(AuthContext);
    const uid = state.uid;//should not get uid inside API

    
    if(report.r_like_list.includes(uid)){
        likeStatus = false;
    }else{
        likeStatus = true;
    }
    const [like_clicked, setLike_clicked] = useState(likeStatus);
    // t.coverimage
    // t_name
    // t_description
    const timeArr = report.r_time.split('.');
    const tagArr = report.r_tag_list.split(',') ;
    return (
       <Card
        title={report.r_title}


        >
            <Image style={styles.image} source={{ uri: report.r_url}} />
            <TouchableOpacity
                style={styles.button}
                
                onPress={
                    async () => {
                        try {
                        
                            const response = await network.post('/subscribeOneMobile', {
                                uid: uid,
                                r_id: report._id,
                                like_clicked: like_clicked,
                            });
                            setLike_clicked(response.data.like_clicked);
                            // Alert.alert("Liked");
                            // Add a Toast on screen.
                            let toast = Toast.show('Liked', {
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
                            console.log(`Liked ${report.r_title}`);
                            setLike_clicked(!like_clicked);
                        } catch (e) {
                            setErrorMessage('Something went wrong.');
                        }
                    }
                }
            >
                <Text style={styles.buttonText}> {like_clicked ? 'Like' : 'Unlike'} </Text>
            </TouchableOpacity>

            <Text style={styles.like}> {report.r_like_num}</Text>

            <Text style={styles.name}>
                <MaterialIcons name="person-outline" size={23}/>
                {report.r_username}
            </Text>
            
            
                
            <Text style={styles.text}>{report.r_description}</Text>
            <Text style={styles.themetitle}>{report.r_tname}</Text>
            <Text style={styles.bookname}>{tagArr[0]}</Text>
           <Text style={styles.author}>from {tagArr[1]}</Text>
            <Text style={styles.time}>{timeArr[0]}</Text>




       </Card>
       
        
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

    like:{
        fontWeight: 'bold',
        fontSize: 12,
    },

    text:{
        fontSize: 18,
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

    button: {
        height: 40,
        width: 180,
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

export default ReportDetail; 