import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EditSVG from './SVG/EditSVG';


const SideControl = (props) => {
    const { leftBtnFunc, rightBtnFunc, previewImg } = props

    return (
        <View style={styles.btnContainer}>
            <View style={styles.cameraBtns}>
                <TouchableOpacity
                    // style={styles}
                    onPress={leftBtnFunc}
                >
                    <Image
                        style={styles.libraryImg}
                        source={{
                            uri: previewImg ? previewImg.localUri : "../assets/photo.jpeg"
                        }}
                    />
                </TouchableOpacity>

                {/* Main action camera button */}
                {props.children}

                <TouchableOpacity
                    style={styles.sideBtn}
                    onPress={rightBtnFunc}
                >
                    <EditSVG
                        width={32}
                        height={32}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1, 
        justifyContent: "center"
    },
    cameraBtns: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly"
    },

    sideBtn: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 8,
        padding: 3,
    },
    libraryImg: {
        width: 45,
        height: 45,
        borderRadius: 5,
    },
})

export default SideControl