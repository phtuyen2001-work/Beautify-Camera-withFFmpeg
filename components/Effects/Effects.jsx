import React from 'react'
import { useSelector } from 'react-redux'
import ContrastSaturationBrightness from './ContrastSaturationBrightness'

const Effects = (props) => {
    const { children } = props

    const { contrast, saturation, brightness } = useSelector(state => state.canvasCam)

    return (
        <ContrastSaturationBrightness
            contrast={contrast}
            saturation={saturation}
            brightness={brightness}
        >
            {children}
        </ContrastSaturationBrightness>
    )
}

export default Effects

