import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CheckSVG from '../SVG/CheckSVG'
import CloseSVG from '../SVG/CloseSVG'
import BottomSheet from '@gorhom/bottom-sheet';

const Backbone = (props) => {
    const snapPoints = useMemo(() => ["25%"], [])

    const handleClose = () => {
        props.sheetRef.current?.close()
    }

    return (
        <BottomSheet
            ref={props.sheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleComponent={null}
            backgroundStyle={{
                backgroundColor: "#000",
                borderRadius: 0
            }}
            handleIndicatorStyle={{
                backgroundColor: "#fff"
            }}
        >
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={handleClose}
                    >
                        <CloseSVG />
                    </TouchableOpacity>
                    <Text style={styles.title}>{props.title}</Text>
                    <TouchableOpacity>
                        <CheckSVG />
                    </TouchableOpacity>
                </View>

                <View style={[styles.bottom, props.style]}>
                    {props.children}
                </View>
            </View>
        </BottomSheet>
    )
}

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
        fontSize: 17
    },
    bottom: {
        flex: 1,
    }
})

export default Backbone