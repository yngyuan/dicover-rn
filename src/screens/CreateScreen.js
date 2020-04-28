import React, {Component, useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Dimensions, Image, ScrollView, Switch} from 'react-native';
import * as firebase from 'firebase';
import LastPhotoTakenUri from "../components/LastPhotoTakenUri";
import {Alert} from "react-native-web";
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import RNPickerSelect from "react-native-picker-select";
import network from "../api/network";
import { RaisedTextButton } from 'react-native-material-buttons';
import * as ImageManipulator from 'expo-image-manipulator';
import {initialize} from "expo/build/Payments";
//gs://apt-hw5-255120.appspot.com/

const firebaseConfig = {
  // apiKey: "AIzaSyAM0gXDwfNIZIIJtggVtpyTofAtcGyYfh8",
  apiKey: "AIzaSyCats6hwFz9pnobG8wTFbQ6W-5B9KocLRM",
  authDomain: "apt-hw5-255120.firebaseapp.com",
  databaseURL: "",
  storageBucket: "apt-hw5-255120.appspot.com",
};
firebase.initializeApp(firebaseConfig);
// const [createApi, mes, errorMessage] = useCreate();
export default class CreateScreen extends Component {
  //initial with current uid


  constructor(props) {
    super(props);
    // const uid = getUid();
    this.state = {
      dataUploading: false,
      dataUploaded: false,
      hasLocationPermission: null,
      errorMessage: null,
      location: null,
      pageRefreshed: false,

      // The following parameters are going to be post.
      // TODO: uid is no implemented.
      uid: props.navigation.state.params.uid,
      latitude: null,
      longitude: null,
      imgUrl: '',
      reportTitle: null,
      reportDescription: null,
      reportTag0: "Default book title",
      reportTag1: "Default author",
      reportTag: "Default tag",
      reportTheme: null,
    };
  }


  onTitleChange = (title) => {
    this.setState({reportTitle: title});
  };
  onDescriptionChange = (dscrpt) => {
    this.setState({reportDescription: dscrpt});
  };
  onTag0Change = (tag0) => {
    console.log(`[${this.state.reportTag0}, ${this.state.reportTag1}]`);
    this.setState({reportTag0: tag0, reportTag:
        `[${this.state.reportTag0}, ${this.state.reportTag1}]`});
  };
  onTag1Change = (tag1) => {
    this.setState({reportTag1: tag1,  reportTag:
        `[${this.state.reportTag0}, ${this.state.reportTag1}]`});
  };
  onThemeChange = (thm) => {
    this.setState({reportTheme: thm});
  };
  onRefreshPress = () => {
    this.setState({
      dataUploading: false,
      dataUploaded: false,
      errorMessage: null,

      // The following parameters are going to be post.
      // TODO: uid is no implemented.
      imgUrl: '',
      reportTitle: null,
      reportDescription: null,
      reportTag0: "Default book title",
      reportTag1: "Default author",
      reportTheme: null,
    });
    this.titleInput.clear();
    this.descriptionInput.clear();
    this.tag0Input.clear();
    this.tag1Input.clear();
  };

  // The function that is corresponding to img uploading and http request.
  onCreatePress = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { compress: 0.3 }
    );
    if (!uri) {
      return;
    }

    this.setState({dataUploading: true});
    const timestr = new Date().getTime().toString();

    // Start to handle firebase img uploading.
    const response = await fetch(manipResult.uri);
    const blob = await response.blob();
    var ref = await firebase.storage().ref().child('images/' + timestr + '.jpg');
    ref.put(blob).then(async () => {
        console.log("in blob.");
        const downloadUrl = await ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at2', downloadURL);
          return downloadURL;
        });
        await this.setState({imgUrl: downloadUrl});
        //Here is the http request
        const report = {
          r_uid: this.state.uid,
          uid: this.state.uid,
          r_title: this.state.reportTitle,
          r_location: this.state.latitude + "," + this.state.longitude,
          r_tag_list: this.state.reportTag,
          r_tname: this.state.reportTheme,
          r_description: this.state.reportDescription,
          r_img_url: this.state.imgUrl
        };//!!! should not use post(url, {xx:xx}}; it will
        //have weird bugs
        try {
          console.log("start posting");
          await network.post('/createReportMobile.html', report);
          //after finishing all HTTP action, set this.state.dataUploading as false, as follows.
          this.setState({dataUploading: false, dataUploaded: true});
        } catch (errorResponse) {
          switch (errorResponse.response.status) {
            // Unauthed user (login expired).
            case 401:
              this.setState({dataUploading: false, dataUploaded: false});
              this.props.navigation.navigate("expireRedirect");
              break;
            // General fault return by server.
            case 400:
              this.setState({dataUploading: false, dataUploaded: false});
              throw errorResponse.response.data;
              break;
          }
        }
      }
    ).catch((error) => {
        Alert.alert(error);
      }
    );
  };

  //Allocate permission for App
  async componentDidMount() {
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   // get your new data here and then set state it will rerender
    // });
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({hasLocationPermission: status === 'granted'});

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    await this.setState({
      location: location,
      latitude: location.coords.latitude, longitude: location.coords.longitude
    });
  }

  render() {
    const {navigation} = this.props;
    const displayUri = this.state.pageRefreshed? null:navigation.getParam('imgUri', null);

    return (
      <ScrollView>
        <View style={styles.btnContainer}>
          <RaisedTextButton
            title="Refresh Page"
            titleColor='rgb(255, 255, 255)'
            color='dodgerblue'
            onPress={() => {
              navigation.setParams({imgUri: null});
              this.onRefreshPress();
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.backgroundStyle}>
            <TextInput
              ref={input => { this.titleInput = input }}
              autoCaptalize={"none"}
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={"Your Title"}
              onChangeText={(text) => this.onTitleChange(text)}
            />
          </View>
          <LastPhotoTakenUri lastCapture={displayUri}/>
          {
            !displayUri &&
            <Image source={require('../../assets/preview.png')}
                   style={{height: 250}}/>
          }
          <View style={styles.btnContainer}>
            <RaisedTextButton
              title="Take a photo from camera"
              titleColor='rgb(255, 255, 255)'
              color='dodgerblue'
              // style={{titleColor: 'rgb(255, 255, 255)', color: 'dodgerblue',}}
              onPress={() => {
                this.props.navigation.navigate('CameraScreenNav');
                // this.setState({pageRefreshed: false});
              }}
            />
          </View>
          <View style={styles.backgroundStyle}>
            <TextInput
              ref={input => { this.descriptionInput = input }}
              autoCaptalize={"none"}
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={"Description"}
              onChangeText={(text) => this.onDescriptionChange(text)}
            />
          </View>

          <View style={styles.backgroundStyle}>
            <TextInput
              ref={input => { this.tag0Input = input }}
              autoCaptalize={"none"}
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={"Name of the Book"}
              onChangeText={(text) => this.onTag0Change(text)}
            />
          </View>

          <View style={styles.backgroundStyle}>
            <TextInput
              ref={input => { this.tag1Input = input }}
              autoCaptalize={"none"}
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={"Author of the Book"}
              onChangeText={(text) => this.onTag1Change(text)}
            />
          </View>

          <RNPickerSelect
            onValueChange={(value) => this.onThemeChange(value)}
            items={[
              {label: 'Poetry', value: 'Poetry'},
              {label: 'Play', value: 'Play'},
              {label: 'Literature', value: 'Literature'},
              {label: 'Business', value: 'Business'},
              {label: 'Children', value: 'Children'},
              {label: 'Fantasy', value: 'Fantasy'},
              {label: 'Sci-Fi', value: 'Sci-Fi'},
              {label: 'Romance', value: 'Romance'},
              {label: 'Memoir', value: 'Memoir'},
              {label: 'Autobiography', value: 'Autobiography'},
            ]}
            placeholder={{label: 'Book Theme', value: 'Default'}}
          />

          {
            !this.state.longitude && !this.state.latitude &&
            <Text style={styles.textStyle}>Fetching location...</Text>
          }
          {
            this.state.longitude &&
            <Text style={styles.textStyle}>Your Current Location: Longitude [
              {this.state.longitude}], Latitude [
              {this.state.latitude}]. </Text>
          }
          <View style={styles.btnContainer}>
            {
              !this.state.dataUploading && !this.state.dataUploaded &&
              <RaisedTextButton
                title="Create Report"
                onPress={() => this.onCreatePress(displayUri)}
                titleColor='rgb(255, 255, 255)'
                color='dodgerblue'
                // style={{titleColor: 'rgb(255, 255, 255)', color: 'dodgerblue',}}
              />
            }
            {
              !this.state.dataUploaded && this.state.dataUploading &&
              <RaisedTextButton
                title="Uploading Data ... "
                titleColor='rgb(255, 255, 255)'
                color='dodgerblue'
                // style={{titleColor: 'rgb(255, 255, 255)', color: 'dodgerblue',}}
                onPress={function () {
                }}
              />
            }
            {
              this.state.dataUploaded && !this.state.dataUploading &&
              <RaisedTextButton
                title="Done! Back to manage page"
                titleColor='rgb(255, 255, 255)'
                color='dodgerblue'
                // style={{titleColor: 'rgb(255, 255, 255)', color: 'dodgerblue',}}
                onPress={() => {
                  this.setState({imgUploaded: false});
                  this.props.navigation.navigate('Manage');
                }}
              />
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    width: Dimensions.get('window').width,
    marginTop: 5,
    backgroundColor: 'rgba(240,238,238,0.02)',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.58)',
    borderBottomWidth: StyleSheet.hairlineWidth,

  },

  inputStyle: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 8,
  },

  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },

  // btnStyle: {
  //   // color: "rgb(70,179,230)",
  //   titleColor: 'rgb(255, 255, 255)',
  //   color: 'dodgerblue',
  //   // titleColor: "white",
  // },

  btnContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  textStyle: {
    marginTop: 10,
    // marginHorizontal: 2,
    marginBottom: 5,
    flexDirection: 'row',
    color: 'grey',
    fontSize: 18,
    paddingLeft: 8,
  },


});
