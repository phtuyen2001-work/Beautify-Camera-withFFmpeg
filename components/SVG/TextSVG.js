import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TextSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M14.46 9.188 9.402 22h2.823l.974-2.469h5.602L19.775 22h2.823L17.54 9.187h-3.08Zm-.225 7.718L16 12.436l1.765 4.47h-3.53Z"
            fill="#fff"
        />
        <Path
            d="M24 3.5H8V1H1v7h2.5v16H1v7h7v-2.5h16V31h7v-7h-2.5V8H31V1h-7v2.5ZM3 6V3h3v3H3Zm3 23H3v-3h3v3Zm18-2.5H8V24H5.5V8H8V5.5h16V8h2.5v16H24v2.5Zm5-.5v3h-3v-3h3ZM26 3h3v3h-3V3Z"
            fill="#fff"
        />
    </Svg>
)

export default TextSVG
