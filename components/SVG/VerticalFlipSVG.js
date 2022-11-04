import * as React from "react"
import Svg, { Path } from "react-native-svg"

const VerticalFlipSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M6.474 2.15A1 1 0 0 0 6 3v10a1 1 0 0 0 1 1h20a1 1 0 0 0 .448-1.894l-20-10a1 1 0 0 0-.974.044ZM22.764 12H8V4.618L22.764 12ZM6 29a1 1 0 0 0 1.448.894l20-10A1 1 0 0 0 27 18H7a1 1 0 0 0-1 1v10Z"
            fill="#fff"
        />
    </Svg>
)

export default VerticalFlipSVG
