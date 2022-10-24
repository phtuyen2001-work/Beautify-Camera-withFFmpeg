import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { Surface } from 'gl-react-expo'
import Effects from './Effects/Effects'
import GLCamera from './GLCamera'
import FiltersControl from './FiltersControl'
import BottomSheet from '@gorhom/bottom-sheet';
import SideControl from './SideControl'


const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const GLScreen = (props) => {
    const surfaceRef = useRef()
    const cameraRef = useRef()

    const snapPoints = useMemo(() => ["5%", "20%"], [])
    const handleOpenSheetModal = (ref) => {
        ref.current?.snapToIndex(0)
    }

    return (
        <>
            <View style={styles.container}>
                <Surface
                    style={{ width: windowWidth, height: windowHeight }}
                    ref={surfaceRef}
                >
                    <Effects>
                        <GLCamera cameraRef={cameraRef} />
                    </Effects>
                </Surface>

            </View>

            <BottomSheet
                index={0}
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
                <SideControl>
                    
                </SideControl>
            </BottomSheet>

            {/* <FiltersControl /> */}
        </>
    )
}

export default GLScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})