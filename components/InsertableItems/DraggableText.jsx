import { StyleSheet, Text } from 'react-native'
import React, { useRef } from 'react'
import Draggable from 'react-native-draggable'

const DraggableText = () => {
    const textRef = useRef()

    const handlePressText = () => {
        // console.log(textRef.current)
    }

    return (
        <Draggable
            x={50}
            y={50}
        >
            <Text
                ref={textRef}

                onPress={handlePressText}>
                dsadasdaadsa
            </Text>
        </Draggable>
    )
}

export default DraggableText

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    }
})