import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import EditsContainer from './EditsContainer'
import SliderBox from './slider/SliderBox'
import { useDispatch, useSelector } from 'react-redux'
import { setContrast, setSaturation, setBrightness, setBlur, setNegative, setFlyeye } from '../../redux/slice/canvasSlice'

const OptionsContainer = () => {
    const dispatch = useDispatch()
    const effectsSelector = useSelector(state => state.canvasCam)

    const options = useMemo(() => [
        {
            title: "Contrast",
            initialValue: 1,
            minimumValue: 0,
            maximumValue: 4,
            step: 0.1,
            setValueFunction: (newValue) => dispatch(setContrast(newValue))
        },
        {
            title: "Saturation",
            initialValue: 1,
            minimumValue: 0,
            maximumValue: 10,
            step: 0.1,
            setValueFunction: (newValue) => dispatch(setSaturation(newValue))
        },
        {
            title: "Brightness",
            initialValue: 1,
            minimumValue: 0,
            maximumValue: 4,
            step: 0.1,
            setValueFunction: (newValue) => dispatch(setBrightness(newValue))
        },
        {
            title: "Blur",
            initialValue: 0,
            minimumValue: 0,
            maximumValue: 6,
            step: 0.05,
            setValueFunction: (newValue) => dispatch(setBlur(newValue))
        },
        {
            title: "Negative",
            initialValue: 0,
            minimumValue: 0,
            maximumValue: 1,
            step: 0.05,
            setValueFunction: (newValue) => dispatch(setNegative(newValue))
        },
        {
            title: "Flyeye",
            initialValue: 0,
            minimumValue: 0,
            maximumValue: 1,
            step: 0.05,
            setValueFunction: (newValue) => dispatch(setFlyeye(newValue))
        },
    ], [])

    const sliderSheetRef = useRef()
    // const [arrEffects, setArrEffects] = useState([])
    const [selectedEffect, setSelectedEffect] = useState({
        title: "",
        initialValue: 0,
        minimumValue: 0,
        maximumValue: 0,
        step: 0,
        setValueFunction: () => {},
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
        // backgroundColor: "red"
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