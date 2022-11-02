import { Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import FiltersControl from './FiltersControl'
import { useDispatch } from 'react-redux';
import { resetCanvas } from '../redux/slice/canvasSlice';
import { manipulateAsync } from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

//Import components from gl-react
import GLImage from "gl-react-image";
import { Surface } from "gl-react-expo";
import Effects from './Effects/Effects';
import { captureRef } from 'react-native-view-shot';

import VideoComponent from './VideoComponent';
import { showToast } from './CustomToast';
import ImageZoom from 'react-native-image-pan-zoom';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
const PotentialHeight = windowHeight * 0.95

const EditScreen = ({ route, navigation }) => {
    const [selected, setSeleted] = useState(null)

    const [modalVisible, setModalVisible] = useState(false)

    // const potentialHeight = useMemo(() => windowHeight * 0.95, [])
    const calculateHeight = () => selected?.height > PotentialHeight ? PotentialHeight : selected.height

    const surfaceRef = useRef()
    const viewRef = useRef()
    const videoRef = useRef()


    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const file = route.params
            // Image.getSize(file.uri, (w, h) => console.log(w, h))

            if (file.type === "image") {
                //resize the selected image before displaying it to the screen
                const manipResult = await manipulateAsync(
                    file.uri,
                    [{ resize: { width: windowWidth } }]
                )
                // console.log(manipResult);
                Image.getSize(manipResult.uri, (w, h) => setSeleted({ ...manipResult, height: h }))
            }
            else if (file.type === "video") {
                setSeleted(file)
            }
            else {
                return <View>ERROR</View>
            }
        })()

    }, [])

    const handleCancel = () => {
        //reset the canvas before switching back to CameraScreen
        dispatch(resetCanvas())
        navigation.goBack()
    }

    /**
     * To handle saving image/video
     */
    const handleSave = async () => {
        let uri;

        if (route.params.type === "image") {
            uri = await captureRef(surfaceRef)

        }
        else {
            uri = videoRef.current.props.source.uri
        }


        MediaLibrary.saveToLibraryAsync(uri)

        showToast("Save to library...")

        dispatch(resetCanvas())
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text onPress={handleCancel} style={styles.topText}>Cancel</Text>
                <Text onPress={handleSave} style={styles.topText}>Save</Text>
            </View>

            <View style={[styles.content]}>
                {route.params.type === "image" ? (!selected ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading resource...</Text>
                    </View>
                    ) : (
                    <ImageZoom
                        style={{ backgroundColor: "#000" }}
                        cropWidth={windowWidth}
                        cropHeight={PotentialHeight}
                        imageWidth={windowWidth}
                        imageHeight={calculateHeight()}
                    >
                        <View style={[styles.surfaceContainer]} ref={viewRef}>
                            <Surface
                                ref={surfaceRef}
                                style={{
                                    width: windowWidth,
                                    height: calculateHeight()
                                }}
                            >
                                <Effects>
                                    <GLImage
                                        resizeMode='stretch'
                                        source={{ uri: selected?.uri }}
                                    />
                                </Effects>
                            </Surface>
                        </View>
                    </ImageZoom>
                    // <Image 
                    //     style={{width: 300, height: 300}}
                    //     source={{ uri: selected?.uri }}
                    // />
                )) : (
                    <View>
                        <VideoComponent
                            videoRef={videoRef}
                            isLooping={true}
                            resizeMode='contain'
                            source={{ uri: selected?.uri }}
                            style={{
                                width: windowWidth,
                                height: "100%"
                            }}
                        />
                    </View>
                )}
            </View>

            {/* <Modal visible={modalVisible} animationType="fade">
                <ImageZoom
                    onClick={() => setModalVisible(!modalVisible)}
                    style={{ backgroundColor: "#000" }}
                    cropWidth={windowWidth}
                    cropHeight={windowHeight}
                    imageWidth={windowWidth}
                    imageHeight={selected?.height > potentialHeight ? potentialHeight : selected.height}
                >   
                    <View>

                    </View>
                </ImageZoom>
            </Modal> */}

            <FiltersControl />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    top: {
        height: (windowHeight * 0.05),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    topText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        zIndex: -1,
    },

    loadingContainer: {
        display: "flex",
        alignItems: "center"
    },
    loadingText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500"
    },

    surfaceContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: PotentialHeight,
        // backgroundColor: "red",
    }
})

export default EditScreen
