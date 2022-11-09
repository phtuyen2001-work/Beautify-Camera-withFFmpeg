import * as React from "react"
import Svg, { Path } from "react-native-svg"

const InsertSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17.333 14.667h4v2.666h-4v4h-2.666v-4h-4v-2.666h4v-4h2.666v4Zm12-7.334v14l-8 8h-14c-2.533 0-4.666-2.133-4.666-4.666V7.333c0-2.533 2.133-4.666 4.666-4.666h17.334c2.533 0 4.666 2.133 4.666 4.666Zm-2.666.4a2.39 2.39 0 0 0-2.4-2.4H7.733a2.39 2.39 0 0 0-2.4 2.4V24.4a2.39 2.39 0 0 0 2.4 2.4H20v-2c0-2.533 2.133-4.667 4.667-4.667h2v-12.4Z"
            fill="#fff"
        />
    </Svg>
)

export default InsertSVG
