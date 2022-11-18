import { StyleSheet, Text, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Draggable from 'react-native-draggable'

import { changeText, setSeletedText } from '../../redux/slice/canvasSlice'

/**
 * DraggableText - jsx
 * @prop {object} text - The object of the text
 * @prop {object} surfaceSize - Object includes size of the surface
 * @prop {object} editSheetRef - The ref of the sheet that contains the DraggableText
 */

const DraggableText = (props) => {
    const { text, surfaceSize, editSheetRef } = props

    const dispatch = useDispatch()
    const textSelector = useSelector((state) => {
        return state.canvasCam.texts.find(i => i.id == text.id)
    })

    const [isEditting, setIsEditting] = useState(false)
    useEffect(() => {
        if (isEditting === true) {
            inputRef.current.focus()
        }
    }, [isEditting])

    const textRef = useRef()
    const inputRef = useRef()

    const handlePressText = () => {
        //Press the Text to switch to Edit state
        setIsEditting(true)
    }

    const handleOnLongPressText = () => {
        dispatch(setSeletedText({
            ...textSelector
        }))
        editSheetRef.current.snapToIndex(0)
    }

    const handleOnChangeInput = (text) => {
        dispatch(changeText({ ...textSelector, content: text }))
    }

    const onEndEditInput = () => {
        setIsEditting(false)
    }

    /**
     * Render the corresponding component based on the state
     * If isEditting is true, render TextInput 
     * Otherwise, render Text  
     */
    return (
        <Draggable
            x={surfaceSize.width / 2}
            y={surfaceSize.height / 3}
        >
            {isEditting === false ?
                <Text
                    ref={textRef}
                    style={[styles.textStyle, { color: textSelector.textColor }]}
                    onPress={handlePressText}
                    onLongPress={handleOnLongPressText}
                >
                    {textSelector.content}
                </Text> :
                <TextInput
                    ref={inputRef}
                    style={[styles.textStyle, { color: textSelector.textColor }]}
                    value={textSelector.content}
                    onChangeText={handleOnChangeInput}
                    onEndEditing={onEndEditInput}
                />
            }
        </Draggable>
    )
}

export default DraggableText

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 17,
        fontWeight: "600"
    }
})