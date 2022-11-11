import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import ResetSVG from '../../SVG/ResetSVG';
import TextColorSVG from '../../SVG/TextColorSVG';
import { useDispatch, useSelector } from 'react-redux';
import { changeTextbyId, removeText, setSeletedText } from '../../../redux/slice/canvasSlice';
import EditsContainer from '../EditsContainer';
import SliderBox from '../slider/SliderBox';
import ColorsBox from './ColorsBox';

const EditInsertibleContainer = (props) => {
    const { sheetRef } = props
    const dispatch = useDispatch()
    const textSelector = useSelector(state => state.canvasCam.texts)
    const selectedTextSelector = useSelector(state => state.canvasCam.selectedText)

    const colorSheetRef = useRef()

    const snapPoints = useMemo(() => ['20%'], []);

    const handleOpenColorSheet = () => {
        colorSheetRef.current.snapToIndex(0)
    }

    const handleDeleteText = () => {
        dispatch(removeText(selectedTextSelector.id))
        dispatch(setSeletedText({}))
        sheetRef.current.close()
    }

    return (
        <>
            <BottomSheet
                index={-1}
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={handleOpenColorSheet}
                    >
                        <TextColorSVG />
                        <Text style={styles.btnText}>Color</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={handleDeleteText}
                    >
                        <ResetSVG />
                        <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

            <EditsContainer sheetRef={colorSheetRef}>
                <ColorsBox sheetRef={colorSheetRef} title="Text Color"/>
            </EditsContainer>
        </>
    )
}

export default EditInsertibleContainer

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