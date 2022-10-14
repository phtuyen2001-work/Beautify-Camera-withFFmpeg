import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useMemo, useEffect, useRef } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import EditsContainer from './EditsContainer'
import SliderBox from './Options/SliderBox'


const OptionsContainer = (props) => {
    const { } = props

    const contrastRef = useRef()
    const saturationRef = useRef()
    const brightnessRef = useRef()
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
        }
    ]), [])


    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    useEffect(() => {
        contrastRef.current?.present()
        saturationRef.current?.present()
        brightnessRef.current?.present()
    }, [contrastRef, saturationRef, brightnessRef])

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
                <SliderBox
                    title="Contrast"
                />
            </EditsContainer>

            <EditsContainer
                sheetRef={saturationRef}
                title="Saturation"
            >
                <SliderBox
                    title="Saturation"
                />
            </EditsContainer>

            <EditsContainer
                sheetRef={brightnessRef}
                title="Brightness"
            >
                <SliderBox
                    title="Brightness"
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