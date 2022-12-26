import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContrast, setSaturation, setBrightness, setBlur, setNegative, setFlyeye } from '../../redux/slice/canvasSlice'
import { imageOptions, videoOptions } from '../../constants/options'

import EditsContainer from './EditsContainer'
import SliderBox from './slider/SliderBox'
import { setBlurVideo, setBrightnessVideo, setContrastVideo, setSaturationVideo } from '../../redux/slice/videoCanvasSlice'

/**
 * OptionsContainer - jsx
 */

const OptionsContainer = (props) => {
    const { canvas } = props

    const dispatch = useDispatch()
    const effectsSelector = useSelector(state => state.canvasCam)

    const options = useMemo(() => {
        return canvas === "image" ?
        [
            {
                title: "Contrast",
                ...imageOptions.contrast,
                setValueFunction: (newValue) => dispatch(setContrast(newValue))
            },
            {
                title: "Saturation",
                ...imageOptions.saturation,
                setValueFunction: (newValue) => dispatch(setSaturation(newValue))
            },
            {
                title: "Brightness",
                ...imageOptions.brightness,
                setValueFunction: (newValue) => dispatch(setBrightness(newValue))
            },
            {
                title: "Blur",
                ...imageOptions.blur,
                setValueFunction: (newValue) => dispatch(setBlur(newValue))
            },
            {
                title: "Negative",
                ...imageOptions.negative,
                setValueFunction: (newValue) => dispatch(setNegative(newValue))
            },
            {
                title: "Flyeye",
                ...imageOptions.flyeye,
                setValueFunction: (newValue) => dispatch(setFlyeye(newValue))
            },
        ] : [
            {
                title: "Contrast",
                ...videoOptions.contrast,
                setValueFunction: (newValue) => dispatch(setContrastVideo(newValue))
            },
            {
                title: "Saturation",
                ...videoOptions.saturation,
                setValueFunction: (newValue) => dispatch(setSaturationVideo(newValue))
            },
            {
                title: "Brightness",
                ...videoOptions.brightness,
                setValueFunction: (newValue) => dispatch(setBrightnessVideo(newValue))
            },
            {
                title: "Blur",
                ...videoOptions.blur,
                setValueFunction: (newValue) => dispatch(setBlurVideo(newValue))
            },
        ]
    }, [])

    const sliderSheetRef = useRef()

    const [selectedEffect, setSelectedEffect] = useState({
        title: "",
        initialValue: 0,
        minimumValue: 0,
        maximumValue: 0,
        step: 0,
        setValueFunction: () => { },
        value: 0
    })

    const handleOpenSheetModal = (index) => {
        setSelectedEffect({ ...options[index], value: effectsSelector[options[index].title.toLowerCase()] })
        sliderSheetRef.current.snapToIndex(0)
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    horizontal
                >
                    {options.map((item, index) => {

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleOpenSheetModal(index)}
                            >
                                <Text style={styles.optionText}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

            <EditsContainer sheetRef={sliderSheetRef}>
                <SliderBox
                    {...selectedEffect}
                />
            </EditsContainer>
        </>
    )
}

export default OptionsContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },

    scrollView: {
        flex: 1
    },
    optionText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 20
    }
})