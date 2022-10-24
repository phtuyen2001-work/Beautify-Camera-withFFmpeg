import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EditsContainer from './Filters/EditsContainer'
import FilterSVG from './SVG/FilterSVG'
import OptionSVG from './SVG/OptionSVG'
import BottomSheet from '@gorhom/bottom-sheet';
import FiltersBox from './Filters/FiltersBox'
import OptionsContainer from './Filters/OptionsContainer'

const FiltersControl = (props) => {
    const { filtersControlRef } = props

    const snapPoints = useMemo(() => ["5%", "20%"], [])

    const filterRef = useRef()
    const optionRef = useRef()
    //TODO: useCallBack ?
    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    return (
        <>
            <BottomSheet
                index={0}
                ref={filtersControlRef}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <View style={styles.btnsView}>
                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={() => handleOpenSheetModal(filterRef)}
                    >
                        <FilterSVG />
                        <Text style={styles.btnText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={() => handleOpenSheetModal(optionRef)}
                    >
                        <OptionSVG />
                        <Text style={styles.btnText}>Options</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

            <EditsContainer sheetRef={filterRef}>
                <FiltersBox title="Filter" />
            </EditsContainer>

            <BottomSheet
                ref={optionRef}
                index={-1}
                snapPoints={["20%"]}
                enablePanDownToClose={true}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <OptionsContainer />
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    btnsView: {
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

export default FiltersControl