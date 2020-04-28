import { useState, useEffect , useContext} from 'react';//need to import useContext
import network from "../api/network";
import {AsyncStorage} from "react-native-web";
import { Context as AuthContext } from '../context/AuthContext';
//5d8eda3ee1b75277bae9e187ls
export default () => {
    const [themes, setThemes] = useState([]);
    const [reports, setReports] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    console.log("manager page ");
    const {state} = useContext(AuthContext);
    const uid = state.uid;
    console.log("manager page uid from authcontext:" + uid);
    // const getuid = async () =>{
    //     await AsyncStorage.getAllKeys().then(console.log);
    //     return await AsyncStorage.getItem("uid");//TODO consider null situation
    //
    // };

    console.log(uid);
        const manageApi = async () => {
        try {


            // const uid = "5d8eda3ee1b75277bae9e187";
            const response = await network.post('/manageMobile', {
                uid : uid
			});
            const themes = response.data.themes;
            const reports = response.data.lists;
            console.log("themes : " + themes.length + "reports : " + reports.length);
            setThemes(response.data.themes);
            setReports(response.data.lists);
        } catch (e) {
            setErrorMessage('Something went wrong.');
            console.log("manage page : " + e.message);
        }
    };
    // // Call manageApi when component is first rendered
    useEffect(()=>{
         manageApi();
     }, []);

    return [manageApi, themes, reports, errorMessage]
};