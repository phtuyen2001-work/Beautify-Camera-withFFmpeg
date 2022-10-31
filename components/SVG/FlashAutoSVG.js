import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const FlashAutoSVG = (props) => (
    <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M3.5 2.333v14H7v10.5l8.167-14H10.5l4.667-10.5H3.5Zm18.667 0h-2.334l-3.733 10.5h2.217l.816-2.333h3.734l.816 2.333H25.9l-3.733-10.5Zm-2.509 6.592L21 4.667l1.342 4.258h-2.684Z"
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

export default FlashAutoSVG
