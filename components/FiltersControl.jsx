import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterSVG from './SVG/FilterSVG'
import OptionSVG from './SVG/OptionSVG'
import BottomSheet from '@gorhom/bottom-sheet';
import FiltersBox from './Filters/FiltersBox'
import OptionsContainer from './Filters/OptionsContainer'
import ResetSVG from './SVG/ResetSVG'
import { useDispatch } from 'react-redux'
import { resetCanvas } from '../redux/slice/canvasSlice';
import { showToast } from './CustomToast';
import InsertibleContainer from './Filters/InsertibleContainer';
import InsertSVG from './SVG/InsertSVG';
import EditsContainer from './Filters/EditsContainer';

const bottomSheetSetting = {
    index: -1,
    snapPoints: ["20%"],
    enablePanDownToClose: true,
    backgroundStyle: {
        backgroundColor: "#000",
        borderRadius: 0
    },
    handleIndicatorStyle: {
        backgroundColor: "#fff"
    },
}

const FiltersControl = (props) => {
    const {
        filtersControlRef,
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
                    borderRadius: 0
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