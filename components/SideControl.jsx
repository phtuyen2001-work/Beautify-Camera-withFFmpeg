import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker"
import EditSVG from './SVG/EditSVG';

const SideControl = (props) => {
    const [previewImg, setPreviewImg] = useState(() => getPreviewPhoto())

    //Switch the camera mode (photo and video)
    const switchMode = (btnPressed) => {
        if (props.cameraMode === "photo") {
            if (btnPressed === "video") props.setCameraModeFunc("video")
            else return
        }
        else {
            if (btnPressed === "photo") props.setCameraModeFunc("photo")
            else return
        }
    }

    //To open the user's media library
    const openImagePickerUI = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        // console.log(pickerResult)
    }

    //Get the newest photo for previewPhoto view
    async function getPreviewPhoto() {
        let arrAssets = await MediaLibrary.getAssetsAsync({
            sortBy: "creationTime",
            mediaType: ["photo", "video"]
        })
        let assetWithID = await MediaLibrary.getAssetInfoAsync(arrAssets.assets[0].id)
        setPreviewImg(assetWithID)
    }

    return (
        <View style={styles.btnContainer}>
            <View style={styles.cameraBtns}>
                <TouchableOpacity
                    // style={styles}
                    onPress={openImagePickerUI}
                >
                    <Image
                        style={styles.libraryImg}
                        source={{
                            uri: previewImg ? previewImg.localUri : "../assets/photo.jpeg"
                        }}
                    />
                </TouchableOpacity>

                {props.children}

                <TouchableOpacity
                    style={styles.sideBtn}
                    onPress
                >
                    <EditSVG
                        width={32}
                        height={32}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.switchBtns}>
                <TouchableOpacity
                    onPress={() => switchMode("photo")}
                    style={[styles.modeView, props.cameraMode === "photo" ? styles.selectedView : null]}
                >
                    <Text style={[{ fontWeight: "700" }, props.cameraMode === "photo" ? styles.selectedViewText : null]}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => switchMode("video")}
                    style={[styles.modeView, props.cameraMode === "video" ? styles.selectedView : null]}
                >
                    <Text style={[{ fontWeight: "700" }, props.cameraMode === "video" ? styles.selectedViewText : null]}>Video</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: "#fff",
        flex: 2,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-around"
    },
    cameraBtns: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly"
    },

    sideBtn: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 8,
        padding: 3,
    },
    libraryImg: {
        width: 45,
        height: 45,
        borderRadius: 5,
    },


    switchBtns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    modeView: {
        marginHorizontal: 10,
    },
    selectedView: {
        backgroundColor: "#000",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 90,
        textAlign: "center"
    },
    selectedViewText: {
        color: "#fff",
    },

})

export default SideControl