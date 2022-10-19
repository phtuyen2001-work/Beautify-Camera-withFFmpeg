import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useMemo, useEffect, useRef } from 'react'
import EditsContainer from './EditsContainer'
import SliderBox from './slider/SliderBox'

const OptionsContainer = (props) => {
    const { } = props

    const contrastRef = useRef()
    const saturationRef = useRef()
    const brightnessRef = useRef()
    const blurRef = useRef()
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
        }
    ]), [])


    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    useEffect(() => {
        contrastRef.current?.present()
        saturationRef.current?.present()
        brightnessRef.current?.present()
        blurRef.current?.present()
    }, [contrastRef, saturationRef, brightnessRef, blurRef])

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

            <EditsContainer
                sheetRef={contrastRef}
            >
                <SliderBox title="Contrast" />
            </EditsContainer>

            <EditsContainer
                sheetRef={saturationRef}
            >
                <SliderBox title="Saturation" />
            </EditsContainer>

            <EditsContainer
                sheetRef={brightnessRef}
            >
                <SliderBox title="Brightness" />
            </EditsContainer>

            <EditsContainer
                sheetRef={blurRef}
            >
                <SliderBox
                    initialValue={0}
                    minimumValue={0}
                    maximumValue={6}
                    title="Blur"
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