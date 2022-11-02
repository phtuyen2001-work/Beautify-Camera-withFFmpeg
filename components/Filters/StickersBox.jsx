import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CheckSVG from '../SVG/CheckSVG'
import CloseSVG from '../SVG/CloseSVG'
import { useDispatch } from 'react-redux'
import { setStickers } from '../../redux/slice/canvasSlice'

import { STICKERS } from '../../stickers/stickers'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

let stickerIndex = 0

const StickersBox = (props) => {
    const { title, sheetRef } = props

    const handleClose = () => {
        sheetRef.current?.close()
    }

    const dispatch = useDispatch()
    const addSticker = (src) => {
        dispatch(setStickers(src))
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
                            onPress={() => addSticker({ src: item.src, id: stickerIndex++ })}
                            key={index}
                        >
                            <Image
                                source={item.src}
                                style={{ width: 50, height: 50 }}
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