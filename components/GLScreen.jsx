import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Surface } from 'gl-react-expo'
import { CameraType } from 'expo-camera'
import { captureRef } from 'react-native-view-shot'
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native'

import Effects from './Effects/Effects'
import FiltersControl from './FiltersControl'
import GLCamera from './GLCamera'
import SideControl from './SideControl'
import { showToast } from './CustomToast'

import EditSVG from './SVG/EditSVG';
import CameraSVG from './SVG/CameraSVG'
import SwitchSVG from './SVG/SwitchSVG'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

/**
 * GLScreen - jsx
 */

const GLScreen = () => {
    const [camType, setCamType] = useState(CameraType.back)

    const navigation = useNavigation()

    const surfaceRef = useRef()
    const cameraRef = useRef()
    const filtersControlRef = useRef()

    const snapPoints = useMemo(() => ["3%", "8%", "20%"], [])

    const handleLeftBtn = () => {
        navigation.goBack()
    }

    const handleRightBtn = () => {
        filtersControlRef.current?.snapToIndex(0)
    }

    //Flip the camera type (back and front)
    const flipCameraType = () => {
        setCamType((current) => (
            current === CameraType.back ? CameraType.front : CameraType.back
        ))
    }

    const takePhoto = async () => {
        if (!cameraRef) return

        const uri = await captureRef(surfaceRef, {
            format: "jpg",
        })
        showToast("Clicked!")
        navigation.navigate("EditScreen", { uri, type: "image" })
    }

    return (
        <View style={styles.container}>
            <Surface
                style={{ width: windowWidth, height: windowHeight }}
                ref={surfaceRef}
            >
                <Effects>
                    <GLCamera
                        camType={camType}
                        cameraRef={cameraRef}
                    />
                </Effects>
            </Surface>

            <BottomSheet
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0,
                    opacity: 0.85
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <View style={styles.camControlContainer}>
                    <TouchableOpacity onPress={flipCameraType}>
                        <SwitchSVG />
                    </TouchableOpacity>
                </View>
                <SideControl
                    leftBtn={
                        <View style={[styles.sideBtns, { padding: 4 }]}>
                            <CameraSVG />
                        </View>
                    }
                    leftBtnFunc={handleLeftBtn}
                    rightBtn={
                        <View style={styles.sideBtns}>
                            <EditSVG width={42} height={42} />
                        </View>
                    }
                    rightBtnFunc={handleRightBtn}
                >
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={takePhoto}
                    >
                        <View style={styles.inner}></View>
                    </TouchableOpacity>
                </SideControl>
            </BottomSheet>

            <FiltersControl
                stay={false}
                transparent={1}
                filtersControlRef={filtersControlRef}
                disableInsertible={true}
            />
        </View>
    )
}

export default GLScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    camControlContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    actionBtn: {
        width: 65,
        height: 65,
        borderRadius: 90,
        borderColor: "#fff",
        borderWidth: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inner: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 90,
    },

    sideBtns: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 8,
        padding: 2
    }
})