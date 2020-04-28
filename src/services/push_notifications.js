import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import network from "../api/network";

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';
const TOKEN_DURATION = 1;//this is hour base
Date.prototype.addHours = function(hour){
    this.setTime(this.getTime() + (hour * 60 *60 *1000));
    return this;
}

export default async function registerForPushNotificationsAsync(uid) {
    // let previousToken = await AsyncStorage.getItem('pushtoken');
    // console.log(previousToken);
    let previousToken = null;
    if (previousToken) {
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        console.log("notification is " + status);
        if (status !== 'granted') {
            return;
        }

        try{
            //generate token for device
            let token = await Notifications.getExpoPushTokenAsync();
            console.log("push token is " + token);
            let expireTime = new Date().addHours(TOKEN_DURATION);
            //get current user
            if (uid == null){
                return;
            }
            //send token, exipre time to server and bind the user
            const response = await network.post('/notification', {
                token: token,
                expire_time : expireTime,
                uid : uid
            })
            console.log("send token of device " + response.status);
        }catch(err){
            console.log(err.message);
        }


        // AsyncStorage.setItem('pushtoken', token);
    }
};
