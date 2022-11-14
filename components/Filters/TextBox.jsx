import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addText, resetText } from '../../redux/slice/canvasSlice'

import CloseSVG from '../SVG/CloseSVG'
import PencilSVG from '../SVG/PencilSVG'
import ResetSVG from '../SVG/ResetSVG'

//To generate index for individual texts
let textIndex = 0

/**
 * TextBox - jsx
 * @prop {string} title - The title of the box
 * @prop {object} sheetRef - The ref of the sheet contains the box
 */

const TextBox = (props) => {
    const { title, sheetRef } = props

    const dispatch = useDispatch()

    const handleClose = () => {
        sheetRef.current?.close()
    }

    const handleAddText = () => {
        dispatch(addText({ 
            id: textIndex++, 
            content: "insert text",
            textColor: "red",
            fontSize: 17 
        }))
        handleClose()
    }

    const handleRemoveAllText = () => {
        dispatch(resetText())
        handleClose()
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity
                    onPress={handleClose}
                >
                    <CloseSVG />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.btnWrap}
                    onPress={() => handleAddText()}
                >
                    <PencilSVG />
                    <Text style={styles.btnText}>Add a text</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnWrap}
                    onPress={handleRemoveAllText}
                >
                    <ResetSVG />
                    <Text style={styles.btnText}>Remove all texts</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TextBox

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
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    btnWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "500",
        marginTop: 5
    }
})