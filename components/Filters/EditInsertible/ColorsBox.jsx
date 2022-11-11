import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CloseSVG from '../../SVG/CloseSVG'
import CheckSVG from '../../SVG/CheckSVG'
import { useDispatch, useSelector } from 'react-redux'
import { changeText, setSeletedText } from '../../../redux/slice/canvasSlice'
import { ScrollView } from 'react-native-gesture-handler'

const colorArr = [
    "#000", "#fff", "red", "blue", "yellow", "green", "purple"
]

const ColorsBox = (props) => {
    const { sheetRef, title } = props
    const dispatch = useDispatch()
    const selectedTextSelector = useSelector(state => state.canvasCam.selectedText)

    const handleClose = () => {
        sheetRef.current?.close()
    }

    const handleSelectColor = (item) => {
        dispatch(setSeletedText({...selectedTextSelector, textColor: item}))
    }

    const handleCheck = () => {
        sheetRef.current?.close()
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity
                    onPress={handleClose}
                >
                    <CloseSVG />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                    onPress={handleCheck}
                >
                    <CheckSVG />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
                {colorArr.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.outer}
                        onPress={() => handleSelectColor(item)}
                    >
                        <View style={[styles.inner, {
                            backgroundColor: item,
                            borderColor: selectedTextSelector.textColor === item ? "#B1E4E7" : item
                        }]}>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default ColorsBox

const styles = StyleSheet.create({
    container: {
        flex: 1
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

    contentContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    outer: {
        backgroundColor: "#fff",
        borderRadius: 90,
        marginHorizontal: 10
    },
    inner: {
        width: 45,
        height: 45,
        margin: 3,
        padding: 3,
        borderRadius: 90,
        borderWidth: 3
    },
})