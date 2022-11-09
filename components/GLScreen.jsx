import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { Surface } from 'gl-react-expo'
import Effects from './Effects/Effects'
import GLCamera from './GLCamera'
import FiltersControl from './FiltersControl'
import BottomSheet from '@gorhom/bottom-sheet';
import SideControl from './SideControl'
import EditSVG from './SVG/EditSVG';
import CameraSVG from './SVG/CameraSVG'
import { captureRef } from 'react-native-view-shot'
import { showToast } from './CustomToast'
import { useNavigation } from '@react-navigation/native'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")


const GLScreen = (props) => {
    const navigation = useNavigation()

    const surfaceRef = useRef()
    const cameraRef = useRef()
    const filtersControlRef = useRef()

    const snapPoints = useMemo(() => ["5%", "20%"], [])

    const handleLeftBtn = useCallback(() => {
        navigation.goBack()
    }, [])

    const handleRightBtn = useCallback(() => {
        filtersControlRef.current?.snapToIndex(0)
    }, [])

    const takePhoto = useCallback(
        async () => {
            if (!cameraRef) return

            const uri = await captureRef(surfaceRef, {
                format: "jpg",
            })
            showToast("Clicked!")
            navigation.navigate("EditScreen", { uri, type: "image" })
        }, []
    )

    return (
        <View style={styles.container}>
            <Surface
                style={{ width: windowWidth, height: windowHeight }}
                ref={surfaceRef}
            >
                <Effects>
                    <GLCamera cameraRef={cameraRef} />
                </Effects>
            </Surface>

            <BottomSheet
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
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
                filtersControlRef={filtersControlRef}
                disableSticker={true}
            />
        </View>
    )
}

export default GLScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
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