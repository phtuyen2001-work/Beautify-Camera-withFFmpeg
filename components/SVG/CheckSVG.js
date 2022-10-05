import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CheckSVG = (props) => (
    <Svg
        width={24}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9.86 18.222a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33h-.01Z"
            fill="#fff"
        />
    </Svg>
)

export default CheckSVG
