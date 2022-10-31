import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const FlashOffSVG = (props) => (
    <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M3.815 3.5 2.333 4.982l5.834 5.833v4.352h3.5v10.5l4.176-7.164 4.842 4.83 1.482-1.481L3.815 3.5Zm16.018 8.167h-4.666l4.666-9.334H8.167v2.544l9.87 9.87 1.796-3.08Z"
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

export default FlashOffSVG
