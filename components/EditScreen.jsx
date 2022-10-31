import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
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

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const EditScreen = ({ route, navigation }) => {
    const [selected, setSeleted] = useState(null)

    const potentialHeight = useMemo(() => windowHeight * 0.95, [])

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
                <Text onPress={handleSave} style={styles.topText}>Save</Text>
            </View>

            <View style={[styles.content]}>
                {route.params.type === "image" ? (selected && (
                    <View style={[styles.surfaceContainer]} ref={viewRef}>
                        <Surface
                            ref={surfaceRef}
                            style={{ 
                                width: windowWidth, 
                                height: selected.height > potentialHeight ? potentialHeight : selected.height
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
    surfaceContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: windowHeight*0.95,
        // backgroundColor: "rgba(0, 0, 0, 0.0)",
    }
})

export default EditScreen
