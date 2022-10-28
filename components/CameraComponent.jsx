import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Camera, CameraType, FlashMode } from 'expo-camera'
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

    const handleFlashMode = () => {

    }

    //TODO: WORK ON PINCH GESTURE
    const pinch = useMemo(() => Gesture.Pinch()
        .runOnJS(true)
        .onUpdate((e) => {
            //TO DO
            if (e.velocity > 0) setZoom(Math.min(zoom + 0.007, 1))
            else if (e.velocity < 0) setZoom(Math.max(zoom - 0.007, 0))
        })
        .onFinalize((e) => {
            if(zoom >= 1) setZoom(1)
            else if (zoom <= 0) setZoom(0)
        }),
        [zoom])

    const gesture = Gesture.Race(pinch)

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
        <GestureDetector
            gesture={gesture}
        >
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

                    <TouchableOpacity onPress={handleFlashMode}>
                        <SwitchSVG />
                    </TouchableOpacity>
                </View>
            </Camera>
        </GestureDetector>
    )
})

export default CameraComponent

const styles = StyleSheet.create({
    topView: {
        top: 10,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        paddingRight: 10,
        width: "100%",

        backgroundColor: "red"
    },
    camera: {
        flex: 1,
    },
});