import { StyleSheet, Text, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-native-draggable'
import { useDispatch } from 'react-redux'
import { removeText } from '../../redux/slice/canvasSlice'

const DraggableText = (props) => {
    const { id, surfaceSize, textColor, content } = props
    const dispatch = useDispatch()

    const [textValue, setTextValue] = useState(content)
    const [isEditting, setIsEditting] = useState(false)

    useEffect(() => {
        if (isEditting === true) {
            inputRef.current.focus()
        }
    }, [isEditting])

    const textRef = useRef()
    const inputRef = useRef()

    const handlePressText = () => {
        setIsEditting(true)
    }

    const handleOnLongPressText = () => {
        console.log("long press");
    }

    const handleOnChangeInput = (text) => {
        setTextValue(text)
    }

    const onEndEditInput = () => {
        setIsEditting(false)
    }

    return (
        <Draggable
            x={surfaceSize.width / 2}
            y={surfaceSize.height / 3}
        >
            {isEditting === false ?
                <Text
                    ref={textRef}
                    style={[styles.text, { color: textColor }]}
                    onPress={handlePressText}
                    onLongPress={handleOnLongPressText}
                >
                    {textValue}
                </Text> :
                <TextInput
                    ref={inputRef}
                    style={[styles.text, { color: textColor }]}
                    value={textValue}
                    onChangeText={handleOnChangeInput}
                    onEndEditing={onEndEditInput}
                />
            }
        </Draggable>
    )
}

export default DraggableText

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight: "600"
    }
})