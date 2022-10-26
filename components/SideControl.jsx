import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

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
                    {/* <Image
                        style={styles.libraryImg}
                        source={{
                            uri: previewImg ? previewImg.localUri : "../assets/photo.jpeg"
                        }}
                    /> */}
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