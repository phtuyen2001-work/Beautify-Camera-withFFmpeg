import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import FiltersControl from './FiltersControl'
import { useDispatch, useSelector } from 'react-redux';
import { removeSticker, resetCanvas } from '../redux/slice/canvasSlice';
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
import Draggable from 'react-native-draggable';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
const PotentialHeight = windowHeight * 0.95

const EditScreen = ({ route, navigation }) => {
    const [selected, setSeleted] = useState(null)

    // const potentialHeight = useMemo(() => windowHeight * 0.95, [])
    const calculateHeight = () => selected?.height > PotentialHeight ? PotentialHeight : selected.height

    const calculateWidth = (width) => {
        if (!width) return windowWidth
        if (width <= windowWidth) return windowWidth
        else return width
    }

    const surfaceRef = useRef()
    const viewRef = useRef()
    const videoRef = useRef()

    const dispatch = useDispatch()
    const stickerSelector = useSelector(state => state.canvasCam.stickers)

    useEffect(() => {
        (async () => {
            const file = route.params
            // Image.getSize(file.uri, (w, h) => console.log(w, h))

            if (file.type === "image") {
                //resize the selected image before displaying it to the screen
                const manipResult = await manipulateAsync(
                    file.uri,
                    [
                        { resize: { width: calculateWidth(file.width) } },
                    ]
                )
                setSeleted({ ...manipResult })
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
        })()
    }, [])

    const handleDisplaySticker = () => {
        const handleRemoveStickerById = (id) => {
            dispatch(removeSticker(id))
        }

        return stickerSelector.map((item, index) => {
            return (
                <Draggable
                    onLongPress={() => handleRemoveStickerById(item.id)}
                    key={index}
                    x={50} y={50}
                    imageSource={item.src}
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

        if (route.params.type === "image") {
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
                <Text
                    style={styles.topText}
                    onPress={() => navigation.navigate("Cropper", {
                        imgSrc: selected.uri,
                        imageWidth: selected.width,
                        imageHeight: selected.height
                    })}>
                    Crop
                </Text>
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

                            <View style={styles.stickerView}>
                                {handleDisplaySticker()}
                            </View>

                            <Surface
                                ref={surfaceRef}
                                style={{
                                    width: "100%",
                                    height: calculateHeight(),
                                }}
                            >
                                <Effects>
                                    <GLImage
                                        resizeMode={selected.width > windowWidth ? "cover" : "stretch"}
                                        source={{ uri: selected?.uri }}
                                    />
                                </Effects>
                            </Surface>
                        </View>
                    </ImageZoom>
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
        maxHeight: PotentialHeight,
    }
})

export default EditScreen
