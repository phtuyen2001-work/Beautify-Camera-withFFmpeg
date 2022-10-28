import React, { useMemo } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useEffect } from 'react'

const EditsContainer = (props) => {
    const { children, sheetRef, title } = props

    useEffect(() => {
        sheetRef.current?.present()
    }, [])

    const snapPoints = useMemo(() => ["20%"], [])

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

            onDismiss={() => console.log("dismissed")}

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

export default EditsContainer