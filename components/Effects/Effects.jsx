import React from 'react'
import ContrastSaturationBrightness from './ContrastSaturationBrightness'

const Effects = (props) => {
    const { children } = props

    return (
        <ContrastSaturationBrightness
            contrast={1}
            saturation={1}
            brightness={1}
        >
            {children}
        </ContrastSaturationBrightness>
    )
}

export default Effects

