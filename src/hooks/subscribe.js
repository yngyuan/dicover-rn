import { useState, useEffect, useContext } from 'react';
import network from "../api/network";
import {Context as AuthContext} from "../context/AuthContext";

export default () => {
    const [reports, setReports] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const {state} = useContext(AuthContext);
    const uid = state.uid;//should not get uid inside API
    const subscribeApi = async () => {
        try {

            const response = await network.post('/subscribeMobile',{
                uid: uid
            });
            setReports(response.data.lists);
        } catch (e) {
            setErrorMessage('Something went wrong.');
        }
    };
    // // Call manageApi when component is first rendered
    useEffect(()=>{
         subscribeApi();
     }, []);

    return [subscribeApi, reports, errorMessage]
};