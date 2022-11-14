import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { removeSticker } from '../../redux/slice/canvasSlice'

import Draggable from 'react-native-draggable'

/**
 * DraggableSticker - jsx
 * @prop {string} id - id of the sticker
 * @prop {*} imgSrc - image source for sticker
 * @prop {object} surfaceSize - the surface which contains the stickers
 */

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