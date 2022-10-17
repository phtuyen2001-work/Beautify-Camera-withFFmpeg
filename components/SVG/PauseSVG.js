import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const PauseSVG = (props) => (
    <Svg
        width={72}
        height={72}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path d="M18 57h12V15H18v42Zm24-42v42h12V15H42Z" fill="#70D7DD" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h72v72H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default PauseSVG
