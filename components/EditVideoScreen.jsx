import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetCanvas } from '../redux/slice/canvasSlice'
import { useEffect } from 'react'
import VideoComponent from './VideoComponent'
import FiltersControl from './FiltersControl'
import { Surface } from 'gl-react-expo'
import Effects from './Effects/Effects'
import GLImage from 'gl-react-image'
import { handleDownloadVideo, handleProcessFFmpeg, handleUploadVideo } from '../api/videoApi'
import { showToast } from './CustomToast'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
const previewImg = require("../assets/photo.png")

const EditVideoScreen = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const videoRef = useRef()
    const surfaceRef = useRef()

    const [selectedVideo, setSelectedVideo] = useState(null)
    useEffect(() => {
        const file = route.params
        // console.log(file);
        if(file.type === "video") {
            setSelectedVideo(file)
        }
        else {
            console.log("WRONG PATH!!!");
            navigation.goBack()
        }
    }, [])

    const handleCancel = () => {
        dispatch(resetCanvas())
        navigation.goBack()
    }

    const handleSave = async () => {
        const result = await handleUploadVideo(selectedVideo)
        navigation.navigate("CameraScreen")
        showToast("Your video is sent and being processed, please wait!")
        // console.log(result);
        await handleProcessFFmpeg(result)
        await handleDownloadVideo(result)
        showToast("Your requested video is finished!")
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text onPress={handleCancel} style={styles.topText}>Cancel</Text>
                <Text onPress={handleSave} style={styles.topText}>Save</Text>
            </View>

            <View style={styles.content}>
                <VideoComponent 
                    videoRef={videoRef}
                    uri={selectedVideo?.uri}
                    useNativeControls
                    isLooping
                    style={styles.video}
                    resizeMode="contain"
                />

                {/* <View>
                    <Surface
                        ref={surfaceRef}
                        style={{
                            width: "100%",
                            height: 200
                        }}
                    >
                        <Effects width={300} height={200}>
                            <GLImage 
                                source={previewImg}
                                resizeMode="contain"
                            />
                        </Effects>
                    </Surface>
                </View> */}
            </View>

            <FiltersControl transparent={0.8}/>
        </View>
    )
}

export default EditVideoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
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
        flexDirection: "column"
    },
    video: {
        width: "100%",
        height: 300
    }
})