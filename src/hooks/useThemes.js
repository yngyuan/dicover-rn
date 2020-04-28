import { useState, useEffect } from 'react';
import network from "../api/network";

export default () => {
    const [themes, setThemes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const discoverApi = async () => {
        try {
            const response = await network.get('/viewMobile');
            setThemes(response.data.lists);
        } catch (e) {
            setErrorMessage('Something went wrong.');
        }
    };
    // // Call discoverApi when component is first rendered
    useEffect(()=>{
         discoverApi();
     }, []);

    return [discoverApi, themes, errorMessage]
};