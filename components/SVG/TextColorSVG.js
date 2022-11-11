import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TextColorSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M22 21h2L17 4h-2L8 21h2l1.61-4h8.74L22 21Zm-9.57-6 3.44-8.37h.26L19.54 15h-7.11ZM6 24h20v4H6v-4Z"
            fill="#fff"
        />
    </Svg>
)

export default TextColorSVG