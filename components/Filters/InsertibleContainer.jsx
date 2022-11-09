import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import StickerSVG from '../SVG/StickerSVG'
import EditsContainer from './EditsContainer'
import StickersBox from './StickersBox'
import TextSVG from '../SVG/TextSVG'
import TextBox from './TextBox'

const InsertibleContainer = () => {
    const stickerRef = useRef()
    const textRef = useRef()

    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btnWrap}
                    onPress={() => handleOpenSheetModal(stickerRef)}
                >
                    <StickerSVG />
                    <Text style={styles.btnText}>Sticker</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnWrap}
                    onPress={() => handleOpenSheetModal(textRef)}
                >
                    <TextSVG />
                    <Text style={styles.btnText}>Text</Text>
                </TouchableOpacity>
            </View>

            <EditsContainer sheetRef={stickerRef}>
                <StickersBox sheetRef={stickerRef} title="Sticker"/>
            </EditsContainer>

            <EditsContainer sheetRef={textRef}>
                <TextBox sheetRef={textRef} title="Text"/>
            </EditsContainer>
        </>
    )
}

export default InsertibleContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
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