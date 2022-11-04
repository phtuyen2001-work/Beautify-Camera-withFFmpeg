import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageCrop from '@mtourj/react-native-image-crop'
import CloseSVG from './SVG/CloseSVG'
import CheckSVG from './SVG/CheckSVG'
import HorizontalFlipSVG from './SVG/HorizontalFlipSVG'
import VerticalFlipSVG from './SVG/VerticalFlipSVG'
import { useNavigation } from '@react-navigation/native'
import { FlipType, manipulateAsync } from 'expo-image-manipulator'
import { useRef } from 'react'

const Cropper = (props) => {
    const { imgSrc, imageWidth, imageHeight } = props.route.params
    const navigation = useNavigation()
    const cropperRef = useRef()

    const [selectedImage, setSeletedImage] = useState(imgSrc)

    const handleClose = () => {
        navigation.goBack()
    }

    const handleCheck = () => {
        const cropResult = cropperRef.current.getCropData()
        navigation.goBack({
            uri: selectedImage,
            type: "image"
        })
        console.log(cropResult);
    }

    const handleHorizontalFlip = async () => {
        const result = await manipulateAsync(
            selectedImage,
            [{ flip: FlipType.Horizontal }]
        )
        setSeletedImage(result.uri)
    }

    const handleVerticalFlip = async () => {
        const result = await manipulateAsync(
            selectedImage,
            [{ flip: FlipType.Vertical }]
        )
        setSeletedImage(result.uri)
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity
                    onPress={handleClose}
                >
                    <CloseSVG />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleHorizontalFlip}
                >
                    <HorizontalFlipSVG />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleVerticalFlip}
                >
                    <VerticalFlipSVG />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleCheck}
                >
                    <CheckSVG />
                </TouchableOpacity>
            </View>

            <View style={{ display: "flex", justifyContent: "center" }}>
                <ImageCrop
                    ref={cropperRef}
                    source={{ uri: selectedImage }}
                    initialCropBoxWidth={350}
                    initialCropBoxHeight={350}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                />
            </View>
        </View>
    )
}

export default Cropper

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        height: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#000"
    },
})