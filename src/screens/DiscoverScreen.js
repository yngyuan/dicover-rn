import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import SearchBar from "../components/SearchBar";
import { NavigationEvents } from 'react-navigation';
import ThemeList from "../components/ThemeList";
import useThemes from "../hooks/useThemes";
import useSearch from "../hooks/useSearch";
import ReportListManage from "../components/ReportListManage"
import MapView from 'react-native-maps';
import ReportList from "../components/ReportList";
import Spacer from "../components/Spacer";
import * as Location from "expo-location";
const DiscoverScreen = ({ navigation }) => {
    const [discoverApi, themes, errorMessage] = useThemes();
    const [query, setQuery] = useState('');
    const [searchApi, locationMarkers, reports, searchErrorMessage, setReports] = useSearch();
    const [location, setLocation] = useState();
    // setThemes(themes_test);
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {/* search bar here*/}
                <SearchBar
                    term={query}
                    onTermChange={setQuery}
                    onTermSubmit={() => {
                        console.log("trigger search button : " + {query} + " ; " + 'Tag')
                        searchApi({keyword : query, field : 'Tag'})
                    }}
                />

                {/* NearMe! button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={async ()=> {
                        Alert.alert("NearMe Pressed! Find the report near you location");
                        let newLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                        console.log("current location :");
                        console.log(newLocation)
                        setLocation(newLocation);

                        const locStr = newLocation.coords.latitude + "," + newLocation.coords.longitude;
                        console.log("near me acquire new location :" + locStr);
                        searchApi({keyword : locStr, field : 'Location'})
                    }}

                >
                    <Text style={styles.buttonText}> NearMe!</Text>
                </TouchableOpacity>
            </View>

            { errorMessage ? <Text>{ errorMessage }</Text> : null }
            <ScrollView style={styles.container2}>

                {!!location && location.coords? <MapView

                    style={styles.map} initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}>

                    {/*{!!location.coords.latitude && !!location.coords.longitude && <MapView.Marker*/}
                    {/*    coordinate={{"latitude": location.coords.latitude, "longitude": location.coords.longitude}}*/}
                    {/*    title={"Your Location"}*/}
                    {/*/>}*/}

                    {locationMarkers.map(marker => {
                        console.log(marker);
                        return (<MapView.Marker
                            key = {marker.id}
                            coordinate={marker.coordinates}
                            title={marker.title}

                        />);
                    })}

                </MapView> : null}
                <ReportList reports={reports}/>
                <ThemeList themes={themes}/>
            </ScrollView>

            <NavigationEvents
                onDidFocus={() => {
                    setReports([]);
                }}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        alignItems: 'center',
        backgroundColor: '#faeee7',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        marginRight: 10,
    },

    buttonText: {
        color: '#ff8ba7',
        fontWeight: 'bold',
        fontSize: 18
    },

    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 80,
        marginTop: 40,

    },
    container2: {
        marginLeft: -10,
    },
    map: {
        marginLeft: 0,
        paddingRight:0,
        flex: 1,
        height : 400,
        width: 400
    },

});

export default DiscoverScreen;
// import React, { useState } from 'react';
// import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import SearchBar from "../components/SearchBar";
// import { NavigationEvents } from 'react-navigation';
// import ThemeList from "../components/ThemeList";
// import useThemes from "../hooks/useThemes";
// import useSearch from "../hooks/useSearch";
// import ReportListManage from "../components/ReportListManage";
// const DiscoverScreen = ({ navigation }) => {
//     const [discoverApi, themes, errorMessage] = useThemes();
//     const [query, setQuery] = useState('');
//     const [searchApi, reports, searchErrorMessage] = useSearch();
//     // setThemes(themes_test);
//     return (
//         <View style={{flex: 1}}>
//             <View style={styles.container}>
//                 {/* search bar here*/}
//                 <SearchBar
//                     term={query}
//                     onTermChange={setQuery}
//                     onTermSubmit={() => {
//                         searchApi({keyword : {query}, filed : 'Tag'})
//                     }}
//                 />
//                 {/* NearMe! button */}
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={()=> Alert.alert("NearMe Pressed!")}
//                 >
//                     <Text style={styles.buttonText}> NearMe! </Text>
//                 </TouchableOpacity>
//             </View>
//             { errorMessage ? <Text>{ errorMessage }</Text> : null }
//             <ReportListManage reports ={reports} />
//             <ThemeList themes ={themes} />
//
//         </View>
//     )
// };
//
// const styles = StyleSheet.create({
//     button: {
//         height: 50,
//         width: 150,
//         alignItems: 'center',
//         backgroundColor: '#faeee7',
//         padding: 10,
//         marginTop: 20,
//         borderRadius: 5,
//         marginRight: 10,
//     },
//
//     buttonText: {
//         color: '#ff8ba7',
//         fontWeight: 'bold',
//         fontSize: 18
//     },
//
//     container: {
//         flex:1,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 80,
//
//     },
//
// });
//
// export default DiscoverScreen;
