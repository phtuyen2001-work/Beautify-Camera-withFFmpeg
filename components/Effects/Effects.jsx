import React from 'react'
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import Blur from './Blur'
import ColorMatrix from './ColorMatrix';
import ContrastSaturationBrightness from './ContrastSaturationBrightness'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Effects = (props) => {
    const { children } = props

    const {
        matrix, offset,
        contrast, saturation, brightness,
        blur
    } = useSelector(state => state.canvasCam)

    return (
        <ColorMatrix matrix={matrix} offset={offset}>
            <ContrastSaturationBrightness
                contrast={contrast}
                saturation={saturation}
                brightness={brightness}
            >
                <Blur passes={6} factor={blur} width={windowWidth} height={windowHeight}>
                    {children}
                </Blur>
            </ContrastSaturationBrightness>
        </ColorMatrix>
    )
}

export default Effects

