import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
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


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const MainEditor = ({ route, navigation }) => {
    const [image, setImage] = useState(null)

    const ref = useRef()

    const dispatch = useDispatch()

    //resize the selected image before displaying it to the screen
    useEffect(() => {
        (async () => {
            const img = route.params.uri
            const manipResult = await manipulateAsync(
                img,
                [{ resize: { width: windowWidth } }]
            )
            setImage(manipResult)
        })()
    }, [])

    const handleCancel = () => {
        //reset the canvas before switching back to MainPanel
        dispatch(resetCanvas())
        navigation.goBack()
    }

    const handleSave = async () => {
        // const result = node.current
        // console.log(ref.current)
        const uri = await captureRef(ref)
        // console.log(uri)

        MediaLibrary.saveToLibraryAsync(uri)
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text onPress={handleCancel} style={styles.topText}>Cancel</Text>
                <Text onPress={handleSave} style={styles.topText}>Save</Text>
            </View>

            <View style={[styles.surfaceContainer]}>
                <Surface
                    ref={ref}
                    style={{ width: "100%", height: "100%",  }}
                >
                    <Effects
                    >
                        <GLImage
                            resizeMode='contain'
                            source={{ uri: image?.uri }}
                        />
                    </Effects>
                </Surface>
            </View>

            <FiltersControl
                stay={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    top: {
        height: "5%",
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
    surfaceContainer: {
        flex: 1,
        justifyContent: "center",
        zIndex: -1,
        backgroundColor: "red"
    }
})

export default MainEditor
