import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const FlashOnSVG = (props) => (
    <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M8.167 2.333v12.834h3.5v10.5l8.166-14h-4.666l4.666-9.334H8.167Z"
                fill="#fff"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h28v28H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default FlashOnSVG
