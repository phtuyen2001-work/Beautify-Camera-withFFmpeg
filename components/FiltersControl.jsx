import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Backbone from './Filters/Backbone'
import FilterLayers from './Filters/FilterLayers'
import FilterSVG from './SVG/FilterSVG'
import OptionSVG from './SVG/OptionSVG'
import BottomSheet from '@gorhom/bottom-sheet';

const FiltersControl = (props) => {
    const snapPoints = useMemo(() => ["25%"], [])

    const handleSheetChanges = useCallback((index) => {
        console.log("handle sheet changes", index)
    }, [])

    const filterRef = useRef()
    const optionRef = useRef()
    const handleOpenSheet = (ref) => {
        ref.current?.snapToIndex(0)
    }


    return (
        <>
            <BottomSheet
                index={-1}
                ref={props.filtersControlRef}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
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
                        onPress={() => handleOpenSheet(filterRef)}
                    >
                        <FilterSVG />
                        <Text style={styles.btnText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={() => handleOpenSheet(optionRef)}
                    >
                        <OptionSVG />
                        <Text style={styles.btnText}>Options</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheet>

            <Backbone 
                sheetRef={filterRef}
                title="Filter"
            >
                <FilterLayers 
                    style={{
                        display: "flex",
                        backgroundColor: "red"
                    }}
                />
            </Backbone>

            <Backbone
                sheetRef={optionRef}
                title="Options"
            >

            </Backbone>
        </>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     height: "25%",
    //     width: "100%",
    //     backgroundColor: "#000",
    //     position: "absolute",
    //     bottom: 0,
    //     left: 0,
    // },
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