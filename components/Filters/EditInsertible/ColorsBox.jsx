import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CloseSVG from '../../SVG/CloseSVG'
import CheckSVG from '../../SVG/CheckSVG'

const colorArr = [
    "#000", "#fff", "red",
]

const ColorsBox = (props) => {
    const { sheetRef, title } = props

    const handleClose = () => {

        sheetRef.current?.close()
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

            <View style={styles.contentContainer}>
                {colorArr.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.outer}>
                        <View style={[styles.inner, {
                            backgroundColor: item,
                            
                        }]}>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
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
        flex: 1,
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
        borderColor: "#B1E4E7",
        borderRadius: 90,
        borderWidth: 2
    },
})