import { StyleSheet } from 'react-native'
import React from 'react'
import Draggable from 'react-native-draggable'
import { useDispatch } from 'react-redux'
import { removeSticker } from '../../redux/slice/canvasSlice'

const DraggableSticker = (props) => {
    const { id, imgSrc, surfaceSize } = props

    const dispatch = useDispatch()

    const handleRemoveStickerById = (id) => {
        dispatch(removeSticker(id))
    }

    return (
        <Draggable
            onLongPress={() => handleRemoveStickerById(id)}
            x={surfaceSize.width/2} 
            y={surfaceSize.height/3}
            imageSource={imgSrc}
        />
    )
}

export default DraggableSticker

const styles = StyleSheet.create({})