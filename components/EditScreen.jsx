import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import FiltersControl from './FiltersControl'
import { useDispatch, useSelector } from 'react-redux';
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
import DraggableSticker from './InsertableItems/DraggableSticker';
import DraggableText from './InsertableItems/DraggableText';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
const PotentialHeight = windowHeight * 0.95

const EditScreen = ({ route, navigation }) => {
    const [selected, setSeleted] = useState(null)
    const [surfaceSize, setSurfaceSize] = useState({ width: 0, height: 0 })
    const { type: contentType } = route.params

    // const calculateHeight = () => selected?.height > PotentialHeight ? PotentialHeight : selected.height

    // const calculateWidth = (width) => {
    //     if (!width) return windowWidth
    //     if (width <= windowWidth) return windowWidth
    //     else return width
    // }

    const surfaceRef = useRef()
    const viewRef = useRef()
    const videoRef = useRef()

    const dispatch = useDispatch()
    const stickerSelector = useSelector(state => state.canvasCam.stickers)

    // const getSize = async (uri) => {
    //     return new Promise((resolve, reject) => {
    //         Image.getSize(uri, (w, h) => {
    //             resolve({
    //                 uri: uri,
    //                 width: w > windowWidth ? windowWidth : w,
    //                 height: h > windowHeight ? windowHeight : h
    //             })
    //         }, async(error) => {
    //             reject("Error", error)
    //         })
    //     })
    // }

    useEffect(() => {
        const file = route.params
        if (file.type === "image") {
            Image.getSize(file.uri, async (w, h) => {
                //resize the selected image before displaying it to the screen
                const manipResult = await manipulateAsync(file.uri)
                const surfaceManip = await manipulateAsync(
                    file.uri,
                    [{ resize: { width: windowWidth } }]
                )
                // const manipResult = await getSize(file.uri)
                // console.log("file", file);
                // console.log("manip", manipResult);
                setSurfaceSize({
                    width: surfaceManip.width,
                    height: surfaceManip.height
                })
                setSeleted(manipResult)
            }, (err) => {
                console.log(err);
            })
        }
        else if (file.type === "video") {
            setSeleted(file)
        }
        else {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={[styles.loadingText, { color: "red" }]}>ERROR</Text>
                </View>
            )
        }
    }, [])

    useEffect(() => {
        (async () => {
            const file = route.params
            if (file.offset && file.size) {
                const manipResult = await manipulateAsync(
                    file.uri,
                    [{
                        crop: {
                            height: file.size?.height,
                            width: file.size?.width,
                            originX: file.offset?.x,
                            originY: file.offset?.y
                        }
                    },]
                )
                setSeleted(manipResult)
            }
        })()
    }, [route])

    // To add sticker in runtime
    const handleDisplaySticker = () => {
        return stickerSelector.map((item, index) => {
            return (
                <DraggableSticker
                    key={index}
                    id={item.id}
                    surfaceSize={surfaceSize}
                    imgSrc={item.src}
                />
            )
        })
    }

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

        if (contentType === "image") {
            uri = await captureRef(viewRef)

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
                {contentType === "image" && <Text
                    style={[styles.topText]}
                    onPress={() => navigation.navigate("Cropper", {
                        imgSrc: selected.uri,
                        imageWidth: selected.width,
                        imageHeight: selected.height
                    })}>
                    Crop
                </Text>}
                <Text onPress={handleSave} style={styles.topText}>Save</Text>
            </View>


            <View style={[styles.content]}>
                {contentType === "image" ? (!selected ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading resource...</Text>
                    </View>
                ) : (
                    <ImageZoom
                        style={{ backgroundColor: "#000" }}
                        cropWidth={windowWidth}
                        cropHeight={PotentialHeight}
                        imageWidth={surfaceSize.width}
                        imageHeight={surfaceSize.height}
                    >
                        <View
                            ref={viewRef}
                            style={[styles.surfaceContainer, {
                                // width: surfaceSize.width,
                                // height: surfaceSize.height
                            }]}
                        >
                            <View style={styles.stickerView}>
                                {handleDisplaySticker()}
                                <DraggableText />
                            </View>

                            <Surface
                                ref={surfaceRef}
                                style={{
                                    width: surfaceSize.width,
                                    height: surfaceSize.height
                                }}
                            >
                                <Effects width={selected.width} height={selected.height}>
                                    <GLImage
                                        // resizeMode={selected.width > windowWidth ? "cover" : "stretch"}
                                        source={{ uri: selected?.uri }}
                                    />
                                    {/* {{ uri: selected?.uri }} */}
                                </Effects>
                            </Surface>
                        </View>
                    </ImageZoom>
                )) : (
                    <View>
                        <VideoComponent
                            videoRef={videoRef}
                            useNativeControls
                            isLooping={false}
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

            {contentType === "image" &&
                <FiltersControl />}
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
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        zIndex: -1,
    },

    loadingContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    loadingText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500"
    },

    stickerView: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
    },
    surfaceContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // maxHeight: PotentialHeight,

        // backgroundColor: "red",
    }
})

export default EditScreen
