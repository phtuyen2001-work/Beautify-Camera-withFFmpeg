import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SwitchSVG = (props) => (
    <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M14 2.8c-2.77 0-5.317 1.011-7.273 2.683a.933.933 0 1 0 1.212 1.419A9.285 9.285 0 0 1 14 4.667a9.32 9.32 0 0 1 9.288 8.4h-2.755l3.734 5.6 3.733-5.6h-2.847C24.675 7.328 19.859 2.8 14 2.8ZM3.733 9.333 0 14.933h2.847C3.325 20.672 8.141 25.2 14 25.2c2.77 0 5.317-1.011 7.273-2.683a.934.934 0 1 0-1.212-1.419A9.285 9.285 0 0 1 14 23.333a9.32 9.32 0 0 1-9.288-8.4h2.755l-3.734-5.6Z"
            fill="#fff"
        />
    </Svg>
)

export default SwitchSVG
