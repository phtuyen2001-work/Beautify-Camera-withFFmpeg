import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HorizontalFlipSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M29.85 25.526A1 1 0 0 1 29 26H19a1 1 0 0 1-1-1V5a1 1 0 0 1 1.894-.448l10 20a1 1 0 0 1-.044.974ZM20 9.236V24h7.382L20 9.236ZM3 26a1.002 1.002 0 0 1-.894-1.448l10-20A1 1 0 0 1 14 5v20a1 1 0 0 1-1 1H3Z"
            fill="#fff"
        />
    </Svg>
)

export default HorizontalFlipSVG
