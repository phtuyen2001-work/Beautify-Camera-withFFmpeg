import React from 'react'
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import Blur from './Blur'
import ColorMatrix from './ColorMatrix';
import ContrastSaturationBrightness from './ContrastSaturationBrightness'
import Flyeye from './Flyeye';
import Negative from './Negative';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Effects = (props) => {
    const { width = windowWidth, height = windowHeight, children } = props

    const {
        matrix, offset,
        contrast, saturation, brightness,
        negative,
        flyeye,
        blur
    } = useSelector(state => state.canvasCam)

    return (
        <ColorMatrix matrix={matrix} offset={offset}>
            <Flyeye factor={flyeye}>
                <Negative factor={negative}>
                    <ContrastSaturationBrightness
                        contrast={contrast}
                        saturation={saturation}
                        brightness={brightness}
                    >
                        <Blur passes={6} factor={blur} width={width} height={height}>
                            {children}
                        </Blur>
                    </ContrastSaturationBrightness>
                </Negative>
            </Flyeye>
        </ColorMatrix>
    )
}

export default Effects

