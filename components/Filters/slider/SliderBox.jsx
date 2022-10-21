import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import CloseSVG from '../../SVG/CloseSVG'
import CheckSVG from '../../SVG/CheckSVG'
import { useDispatch } from 'react-redux'
import { setContrast, setSaturation, setBrightness, setBlur, setNegative, setFlyeye } from '../../../redux/slice/canvasSlice'

const SliderBox = (props) => {
    const { sheetRef, title, minimumValue=0, maximumValue=2, step=0.05, initialValue=1 } = props

    const dispatch = useDispatch()
    //to show value under the slider
    const [value, setValue] = useState(initialValue)
    const handleValueChange = (e) => {
        setValue(e)
    }

    const handleClose = () => {
        sheetRef.current?.close()
    }

    const handleCheck = () => {
        switch (title) {
            // set contrast
            case 'contrast':
                dispatch(setContrast(value))
                break;
            // set saturation
            case 'saturation':
                dispatch(setSaturation(value))
                break;
            // set brightness
            case 'brightness':
                dispatch(setBrightness(value))
                break;
            // set blur
            case 'blur':
                dispatch(setBlur(value))
                break;
            // set negative
            case "negative":
                dispatch(setNegative(value))
                break;
            // set flyeye
            case "flyeye":
                dispatch(setFlyeye(value))
                break;
        }
        sheetRef.current?.close()
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={handleClose}>
                    <CloseSVG />
                </TouchableOpacity>
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                <TouchableOpacity onPress={handleCheck}>
                    <CheckSVG />
                </TouchableOpacity>
            </View>

            <View style={[styles.bottom]}>
                <Slider
                    style={{ width: 200, height: 30 }}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#808080"
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    step={step}
                    value={value}
                    onValueChange={handleValueChange}
                />
                <Text style={styles.text}>{value.toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default SliderBox

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    title: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 17,
    },
    bottom: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700"
    }
})