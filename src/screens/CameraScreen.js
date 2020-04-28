import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import CamearToolBar from "../components/CamearToolBar";

export default class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        lastCapture: null,
        imgUri: '',
    };

    //Take photo action
    takePicture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({lastCapture: photoData, imgUri: photoData.uri});
    };

    //Used when the user confirms the photo.
    pressCheck = () => {
        console.log('imguri:');
        console.log(this.state.imgUri);
        this.props.navigation.navigate('CreateScreenNav', {
            imgUri: this.state.imgUri,
        });
    };

    //Ask for camera permission
    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <React.Fragment>
                    <View>
                        <Camera
                            type={this.state.type}
                            style={cameraStyle.preview}
                            flashMode={this.state.flashMode}
                            ref={ref => {
                                this.camera = ref;
                            }}/>
                    </View>
                    <CamearToolBar
                        lastCapture={this.state.lastCapture}
                        onShortCapture={this.takePicture}
                        onCheckPress={this.pressCheck}/>
                </React.Fragment>
            );
        }
    }
}

const cameraStyle = StyleSheet.create(
    {
        preview: {
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
    }
);