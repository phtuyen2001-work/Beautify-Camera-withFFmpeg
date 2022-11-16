import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { resetCanvas } from '../redux/slice/canvasSlice';
import BottomSheet from '@gorhom/bottom-sheet';

import InsertibleContainer from './Filters/InsertibleContainer';
import OptionsContainer from './Filters/OptionsContainer'
import FiltersBox from './Filters/FiltersBox'
import { showToast } from './CustomToast';

import OptionSVG from './SVG/OptionSVG'
import FilterSVG from './SVG/FilterSVG'
import ResetSVG from './SVG/ResetSVG'
import InsertSVG from './SVG/InsertSVG';

const bottomSheetSetting = {
    index: -1,
    snapPoints: ["20%"],
    enablePanDownToClose: true,
    backgroundStyle: {
        backgroundColor: "#000",
        borderRadius: 0,
    },
    handleIndicatorStyle: {
        backgroundColor: "#fff"
    },
}

/**
 * FiltersControl - jsx
 * @prop {object} filtersControlRef - the ref of the FiltersControl
 * @prop {boolean} disableFilter - to disable the Filter box
 * @prop {boolean} disableOption - to disable the Option box
 * @prop {boolean} disableInsertible - to disable the Insertible box
 * @prop {boolean} to - to decide that FiltersControl can be able to stay at the minimum of 5% of height 
 */

const FiltersControl = (props) => {
    const {
        filtersControlRef,
        transparent = 1,
        disableFilter = false,
        disableOption = false,
        disableInsertible = false,
        stay = true
    } = props

    const dispatch = useDispatch()

    const snapPoints = useMemo(() => stay ? ["5%", "20%"] : ["20%"], [])

    const filterRef = useRef()
    const optionRef = useRef()
    const insertibleRef = useRef()
    //TODO: useCallBack ?
    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    const handleReset = () => {
        dispatch(resetCanvas())
        showToast("Canvas is reset")
    }

    return (
        <>
            <BottomSheet
                index={stay ? 0 : -1}
                ref={filtersControlRef}
                snapPoints={snapPoints}
                enablePanDownToClose={stay ? false : true}
                backgroundStyle={{
                    backgroundColor: "#000",
                    borderRadius: 0,
                    opacity: transparent
                }}
                handleIndicatorStyle={{
                    backgroundColor: "#fff"
                }}
            >
                <View style={styles.btnsView}>
                    {!disableInsertible &&
                        <TouchableOpacity
                            style={styles.btnWrap}
                            onPress={() => handleOpenSheetModal(insertibleRef)}
                        >
                            <InsertSVG />
                            <Text style={styles.btnText}>Insert</Text>
                        </TouchableOpacity>
                    }
                    {!disableFilter &&
                        <TouchableOpacity
                            style={styles.btnWrap}
                            onPress={() => handleOpenSheetModal(filterRef)}
                        >
                            <FilterSVG />
                            <Text style={styles.btnText}>Filters</Text>
                        </TouchableOpacity>
                    }

                    {!disableOption &&
                        <TouchableOpacity
                            style={styles.btnWrap}
                            onPress={() => handleOpenSheetModal(optionRef)}
                        >
                            <OptionSVG />
                            <Text style={styles.btnText}>Options</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={styles.btnWrap}
                        onPress={handleReset}
                    >
                        <ResetSVG />
                        <Text style={styles.btnText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

            {!disableInsertible &&
                <BottomSheet
                    {...bottomSheetSetting}
                    ref={insertibleRef}
                >
                    <InsertibleContainer />
                </BottomSheet>
            }

            {!disableFilter &&
                <BottomSheet
                    {...bottomSheetSetting}
                    ref={filterRef}
                    snapPoints={["23%"]}
                    enablePanDownToClose={false}
                    handleComponent={null}
                >
                    <FiltersBox sheetRef={filterRef} title="Filter" />
                </BottomSheet>
            }

            {!disableOption &&
                <BottomSheet
                    {...bottomSheetSetting}
                    ref={optionRef}
                >
                    <OptionsContainer />
                </BottomSheet>
            }
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