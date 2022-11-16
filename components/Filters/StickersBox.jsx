import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useDispatch } from 'react-redux'
import { addSticker, resetSticker } from '../../redux/slice/canvasSlice'

import { STICKERS } from '../../stickers/stickers'
import CheckSVG from '../SVG/CheckSVG'
import CloseSVG from '../SVG/CloseSVG'

//To generate index for individual stickers
let stickerIndex = 0

/**
 * StickerBox - jsx
 * @prop {string} title - The title of the box
 * @prop {object} sheetRef - The ref of the sheet contains the box
 */

const StickersBox = (props) => {
    const { title, sheetRef } = props

    const dispatch = useDispatch()

    const handleAddSticker = (item) => {
        dispatch(addSticker({ src: item.src, id: stickerIndex++ }))
    }

    const handleClose = () => {
        dispatch(resetSticker())
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

            <BottomSheetScrollView>
                <View style={styles.contentContainer}>
                    {STICKERS.map((item, index) => (
                        <TouchableOpacity
                            style={{ margin: 15 }}
                            onPress={() => handleAddSticker(item)}
                            key={index}
                        >
                            <Image
                                source={item.src}
                                style={{ width: 55, height: 55 }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheetScrollView>
        </View>
    )
}

export default StickersBox

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

    contentContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap"
    }
})