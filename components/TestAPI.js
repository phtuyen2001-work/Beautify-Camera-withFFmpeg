import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from "expo-sharing";
import { useRef } from 'react';

const createFormData = (input, body = {}) => {
    const data = new FormData();

    data.append('input', {
        name: input.fileName,
        type: input.type,
        uri: Platform.OS === 'ios' ? input.uri.replace('file://', '') : input.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const TestAPI = () => {
    const videoRef = useRef()
    const [resource, setResource] = useState(null)
    const [currentUpload, setCurrentUpload] = useState(null)
    const [video, setVideo] = useState(null)

    // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    const handleUpload = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        })

        if (!res.cancelled) {
            setResource(res)
            // console.log(res.uri);
            fetch(`http://10.0.0.91:3000/api/upload`, {
                method: "POST",
                body: createFormData(res),
            })
                .then((res) => res.json())
                .then((res) => {
                    setCurrentUpload(res)
                })
                .catch((err) => console.log(err))
        }
    }

    const handleProcess = async () => {
        // let assetId = replaceChar(resource.assetId)
        // console.log(assetId);
        await fetch(`http://10.0.0.91:3000/api/execute/${currentUpload.resourceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resourceId: currentUpload.resourceId,
                type: currentUpload.type,
                command: "eq=brightness=0.3:gamma_r=1.5",
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const handleDownload = async () => {
        await ensureDirExists();

        const fileName = `${currentUpload.resourceId}.${currentUpload.type}`
        // const downloadResumable = FileSystem.createDownloadResumable(
        //     `http://10.0.0.91:3000/api/download/${fileName}`,
        //     FileSystem.cacheDirectory + `output/output_${fileName}`,
        // )

        try {
            await FileSystem.downloadAsync(
                `http://10.0.0.91:3000/api/download/${fileName}`,
                FileSystem.cacheDirectory + `output/output_${fileName}`,
            ).then(async (result) => {
                console.log('Finished downloading to ', result)
                FileSystem.getInfoAsync(result.uri)
                    .then((r) => console.log(r))
                    .catch(e => console.log(e))
                setVideo(result.uri)
                // // const video = await MediaLibrary.createAssetAsync(uri)
                // // const album = await MediaLibrary.createAlbumAsync("DownLoads", video);
                await MediaLibrary.saveToLibraryAsync(video)
            })
            // console.log("Finished saving to Library");

            // if(Platform.OS === "ios") {
            //     const UTI = "public.item";
            //     const shareResult = await Sharing.shareAsync(uri, { UTI })
            //     console.log(shareResult);
            // }
        }
        catch (err) {
            console.log(err);
        }

    }

    const ensureDirExists = async () => {
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "output/")
        if (!dirInfo.exists) {
            console.log("Output directory doesnot exist, creating .....");
            await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + "output/", { intermediates: true })
        }
    }

    const handleDelete = async () => {
        FileSystem.deleteAsync(FileSystem.documentDirectory + "output/")
            .then(() => console.log("document Deleted!"))
            .catch((err) => console.log(err))
        FileSystem.deleteAsync(FileSystem.cacheDirectory + "output/")
            .then(() => console.log("cache Deleted!"))
            .catch((err) => console.log(err))
        // console.log("Deleted");
    }

    return (
        <View style={styles.container}>
            <Button
                title='Upload'
                onPress={handleUpload}
            >
            </Button>

            <Button
                title='Process'
                onPress={handleProcess}
            ></Button>

            <Button
                title='Download'
                onPress={handleDownload}
            ></Button>

            <Button
                title='Delete'
                onPress={handleDelete}
            ></Button>

            {video && (
                <Video
                    ref={videoRef}
                    useNativeControls
                    isLooping={true}
                    resizeMode='contain'
                    style={{
                        width: "100%",
                        height: 400
                    }}
                    onLoad={async () => {
                        await videoRef.current?.playAsync();
                        await videoRef.current?.pauseAsync();
                    }}
                    source={{ uri: video }}
                />
            )}
        </View>
    )
}

export default TestAPI

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    }
})