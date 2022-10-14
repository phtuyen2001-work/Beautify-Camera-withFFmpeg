import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useEffect } from 'react'

const EditsContainer = (props) => {
    const { children, style, sheetRef, title } = props

    useEffect(() => {
        sheetRef.current?.present()
    }, [sheetRef])

    const snapPoints = useMemo(() => ["23%"], [])

    //clone chilren for parent to pass props/functions to them
    const childrenWithProps = React.Children.map(children, child => {
        // check valid element
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { sheetRef })
        }
        return child
    })

    return (
        <BottomSheetModal
            stackBehavior='push'
            enableDismissOnClose={false}
            index={-1}
            ref={sheetRef}

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
            {childrenWithProps}
        </BottomSheetModal>
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
        fontSize: 17,
    },
    bottom: {
        flex: 1,
    }
})

export default EditsContainer