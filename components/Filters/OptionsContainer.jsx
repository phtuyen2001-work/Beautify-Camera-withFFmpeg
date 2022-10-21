import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useMemo, useEffect, useRef } from 'react'
import EditsContainer from './EditsContainer'
import SliderBox from './slider/SliderBox'

const OptionsContainer = (props) => {
    const contrastRef = useRef()
    const saturationRef = useRef()
    const brightnessRef = useRef()
    const blurRef = useRef()
    const negativeRef = useRef()
    const flyeyeRef = useRef()
    const hueRotateRef = useRef()
    const options = useMemo(() => ([
        {
            title: "Contrast",
            ref: contrastRef
        },
        {
            title: "Saturation",
            ref: saturationRef
        },
        {
            title: "Brightness",
            ref: brightnessRef
        },
        {
            title: "Blur",
            ref: blurRef
        },
        {
            title: "Negative",
            ref: negativeRef
        },
        {
            title: "Flyeye",
            ref: flyeyeRef
        },
    ]), [])


    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    useEffect(() => {
        //To set the modals to "ready" state
        contrastRef.current?.present()
        saturationRef.current?.present()
        brightnessRef.current?.present()
        blurRef.current?.present()
        negativeRef.current?.present()
        flyeyeRef.current?.present()
    }, [contrastRef, saturationRef, brightnessRef, blurRef, negativeRef, flyeyeRef])

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
                                onPress={() => handleOpenSheetModal(item.ref)}
                            >
                                <Text style={styles.optionText}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

            <EditsContainer sheetRef={contrastRef}>
                <SliderBox
                    initialValue={1}
                    minimumValue={0}
                    maximumValue={4}
                    step={0.1}
                    title="contrast"
                />
            </EditsContainer>

            <EditsContainer sheetRef={saturationRef}>
                <SliderBox
                    initialValue={1}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.1}
                    title="saturation"
                />
            </EditsContainer>

            <EditsContainer sheetRef={brightnessRef}>
                <SliderBox
                    initialValue={1}
                    minimumValue={0}
                    maximumValue={4}
                    step={0.1}
                    title="brightness"
                />
            </EditsContainer>

            <EditsContainer sheetRef={blurRef}>
                <SliderBox
                    initialValue={0}
                    minimumValue={0}
                    maximumValue={6}
                    title="blur"
                />
            </EditsContainer>

            <EditsContainer sheetRef={negativeRef}>
                <SliderBox
                    initialValue={0}
                    minimumValue={0}
                    maximumValue={1}
                    title="negative"
                />
            </EditsContainer>

            <EditsContainer sheetRef={flyeyeRef}>
                <SliderBox
                    step={0.1}
                    initialValue={0}
                    minimumValue={0}
                    maximumValue={1}
                    title="flyeye"
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