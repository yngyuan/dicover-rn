import { useEffect, useState } from 'react';
import network from "../api/network";

export default () => {
    const [reports, setReports] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [locationMarkers, setLocationMarkers] = useState([]);
    const searchApi = async ({keyword, field='Tag'}) => {
        console.log('try to search, keyword:' + keyword + ' field: ' + field);
        try {
            const response = await network.post('/searchMobile',
                {
                    keyword: keyword, field : field
                }
            );
            const newReports = response.data.lists;
            console.log(newReports)
            setReports(newReports);
            let newMarkers = []
            console.log("search receive " + newReports.length + " reports");
            for (let i = 0; i < newReports.length; i++){

                let location = newReports[i].r_location.split(',')
                newMarkers.push({
                    coordinates:{
                        latitude: parseFloat(location[0]),
                        longitude: parseFloat(location[1])
                    },
                    title: newReports[i].r_title,
                    id: newReports[i]._id

                })
            }
            setLocationMarkers(newMarkers)
            console.log(newMarkers)
        } catch (err) {
            console.log(err.message)
            setReports([]);//when error, result is empty array
            setErrorMessage(err.message);
        }
    };

    // Call searchApi when component
    // is first rendered.  BAD CODE!
    // searchApi('pasta');
    // useEffect(() => {
    //     searchApi({keyword :'sky'});
    // }, []);

    return [searchApi, locationMarkers, reports, errorMessage, setReports];
};
