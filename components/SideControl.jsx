import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

/**
 * SideControl - jsx
 * @prop {*} leftBtn - render componets on the left side of SideControl
 * @prop {function} leftBtnFunc - function of the left button when pressed
 * @prop {*} rightBtn - render componets on the right side of SideControl
 * @prop {function} rightBtnFunc - function of the right button when pressed
 */

const SideControl = (props) => {
    const { leftBtn, leftBtnFunc, 
        rightBtn, rightBtnFunc, 
    } = props

    return (
        <View style={styles.btnContainer}>
            <View style={styles.btnsAlign}>
                <TouchableOpacity
                    // style={styles}
                    onPress={leftBtnFunc}
                >
                    {leftBtn}
                </TouchableOpacity>

                {/* Main action camera button */}
                {props.children}

                <TouchableOpacity
                    // style={styles.sideBtn}
                    onPress={rightBtnFunc}
                >
                    {rightBtn}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1, 
        justifyContent: "center",
    },
    btnsAlign: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly"
    },

    libraryImg: {
        width: 45,
        height: 45,
        borderRadius: 5,
    },
})

export default SideControl