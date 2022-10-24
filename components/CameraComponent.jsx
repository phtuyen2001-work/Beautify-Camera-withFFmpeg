import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import SwitchSVG from './SVG/SwitchSVG';

const CameraComponent = React.memo((props) => {

    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [zoom, setZoom] = useState(0)

    //To switch the camera type: front / back
    const [camType, setCamType] = useState(CameraType.back)

    //Flip the camera type (back and front)
    const flipCameraType = () => {
        setCamType((current) => (
            current === CameraType.back ? CameraType.front : CameraType.back
        ))
    }

    //TODO: WORK ON PINCH GESTURE
    // const pinch = Gesture.Pinch()
    //     .onUpdate((e) => {
    //         // console.log(e)
    //     })
    //     .onChange((e) => {
    //         if (e.scale < 1 && zoom < 0.95) setZoom(zoom + 0.005)
    //         else if (e.scale > 1 && zoom > 0.05) setZoom(zoom - 0.005)
    //     })

    // const gesture = Gesture.Race(pinch)

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    return (
        // <GestureDetector
        //     gesture={gesture}
        // >
        <Camera
            style={[styles.camera, props.cameraStyle]}
            ref={props.cameraRef}
            type={camType}
            zoom={zoom}
            {...props}
        >
            <View style={styles.topView}>
                <TouchableOpacity onPress={flipCameraType}>
                    <SwitchSVG />
                </TouchableOpacity>
            </View>
        </Camera>
        // </GestureDetector>
    )
})

export default CameraComponent

const styles = StyleSheet.create({
    topView: {
        top: 10,
        right: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10,
        width: "100%",
    },
    camera: {
        flex: 1,
    },
});