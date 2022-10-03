import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useState } from 'react'
import { Camera } from 'expo-camera'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function CameraComponent(props) {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [zoom, setZoom] = useState(0.2)

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            // console.log(e)
        })
        .onChange((e) => {
            if(e.scale < 1 && zoom < 0.8) setZoom(zoom + 0.005)
            else if (e.scale > 1 && zoom > 0.1) setZoom(zoom - 0.005)
        })

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
                type={props.type}
                zoom={zoom}
                {...props}
            >
                {props.children && console.log(zoom)}
            </Camera>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    camera: {
        flex: 1,
    },
});