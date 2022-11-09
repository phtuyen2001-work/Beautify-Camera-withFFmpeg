import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PencilSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M5.777 21.397 22.093 5.08a3.413 3.413 0 0 1 4.827 4.825L10.601 26.223a2.666 2.666 0 0 1-1.362.729L4 28l1.048-5.24c.103-.516.357-.99.73-1.363v0Z"
            stroke="#fff"
            strokeWidth={2.667}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path d="m19.333 8.667 4 4" stroke="#fff" strokeWidth={2.667} />
    </Svg>
)

export default PencilSVG
