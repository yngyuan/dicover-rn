import React, {Component} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Col, Row, Grid} from "react-native-easy-grid";
import {View, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LastPhotoTaken from "./LastPhotoTaken";

const CamerToolBar = props => {
    return (
        <Grid style={toolbarStyle.bottomToolbar}>
            <Row>
                {/* Display the last image take by camera. */}
                <Col style={toolbarStyle.alignCenter}>
                    <LastPhotoTaken lastCapture={props.lastCapture}/>
                </Col>
                {/* The take photo button. */}
                <Col size={2} style={toolbarStyle.alignCenter}>
                    <TouchableWithoutFeedback
                        onPress={props.onShortCapture}>
                        <View style={toolbarStyle.captureBtn}/>
                    </TouchableWithoutFeedback>
                </Col>
                {/* Confirm button. */}
                <Col style={toolbarStyle.alignCenter}>
                    {props.lastCapture &&
                    <TouchableOpacity
                        onPress={props.onCheckPress}>
                        <MaterialCommunityIcons
                            name="check"
                            color="black"
                            size={40}
                        />
                    </TouchableOpacity>
                    }
                </Col>
            </Row>
        </Grid>
    );
};

export default CamerToolBar;

const toolbarStyle = StyleSheet.create({
    bottomToolbar: {
        width: Dimensions.get('screen').width,
        position: 'absolute',
        height: 100,
        bottom: 0,
        backgroundColor: '#FFFFFF'
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#000000",
    },
});