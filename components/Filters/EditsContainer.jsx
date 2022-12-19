import React, { useMemo, useEffect } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';

/**
 * EditsContainer - jsx
 * @prop {object} sheetRef - The ref of the sheet contains the box
 * @prop {string} title - The title of the box
 * @prop {*} children
 * @prop {*} - for configuring 
 */

const EditsContainer = (props) => {
    const { children, sheetRef, title, ...configures } = props

    useEffect(() => {
        sheetRef.current?.present()
        // return () => {
        //     console.log("test");
        //     sheetRef.current?.dismiss()
        // }
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
            name={`modal-${title}`}
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
            {...configures}
        >
            {childrenWithProps}
        </BottomSheetModal>
    )
}

export default EditsContainer