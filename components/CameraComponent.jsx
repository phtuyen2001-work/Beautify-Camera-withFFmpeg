import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import SwitchSVG from './SVG/SwitchSVG';
import FlashOffSVG from './SVG/FlashOffSVG';
import FlashOnSVG from './SVG/FlashOnSVG';
import FlashAutoSVG from './SVG/FlashAutoSVG';
import { showToast } from './CustomToast';

/**
 * CameraComponent - jsx
 * @prop {object} cameraRef - the ref of the camera
 * @prop {string} cameraMode - state of the camera's mode
 */

const CameraComponent = React.memo((props) => {
    const { cameraRef, cameraMode } = props

    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [zoom, setZoom] = useState(0)
    const [flash, setFlash] = useState(FlashMode.off)

    //To switch the camera type: front / back
    const [camType, setCamType] = useState(CameraType.back)

    //Flip the camera type (back and front)
    const flipCameraType = () => {
        setCamType((current) => (
            current === CameraType.back ? CameraType.front : CameraType.back
        ))
    }

    //To handle flash mode when press
    const handleFlashMode = () => {
        if (flash === FlashMode.off) {
            setFlash(FlashMode.on)
            showToast("Flash on")
        }
        else if (flash === FlashMode.on) {
            setFlash(FlashMode.auto)
            showToast("Flash auto")
        }
        else {
            setFlash(FlashMode.off)
            showToast("Flash off")
        }
    }

    //To display flash mode icon based on the flash mode state
    const flashModeIcon = () => {
        switch (flash) {
            case FlashMode.off:
                return <FlashOffSVG />
            case FlashMode.on:
                return <FlashOnSVG />
            case FlashMode.auto:
                return <FlashAutoSVG />
            default:
                return <FlashOffSVG />
        }
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
            if (zoom >= 1) setZoom(1)
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
                ref={cameraRef}
                type={camType}
                zoom={zoom}
                flashMode={flash}
                {...props}
            >
                <View style={styles.topView}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={flipCameraType}
                    >
                        <SwitchSVG />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, { display: cameraMode === "video" ? "none" : "flex" }]}
                        onPress={handleFlashMode}
                    >
                        {flashModeIcon()}
                    </TouchableOpacity>
                </View>
            </Camera>
        </GestureDetector>
    )
})

export default CameraComponent

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    topView: {
        position: "absolute",
        top: 10,
        right: 10,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: 40,
        borderRadius: 90,
        paddingVertical: 5,

        backgroundColor: "rgba(22, 20, 19, 0.5)",
    },
    btn: {
        marginVertical: 5
    }
});