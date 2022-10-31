import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ResetSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M7.467 4.267c-.273 0-.547.104-.755.312L4.58 6.712a1.066 1.066 0 0 0 0 1.509L12.36 16l-7.78 7.78a1.066 1.066 0 0 0 0 1.508l2.133 2.133a1.065 1.065 0 0 0 1.509 0L16 19.64l7.78 7.78a1.065 1.065 0 0 0 1.508 0l2.133-2.133a1.065 1.065 0 0 0 0-1.509L19.64 16l7.78-7.78a1.065 1.065 0 0 0 0-1.508L25.288 4.58a1.066 1.066 0 0 0-1.509 0L16 12.36l-7.78-7.78a1.063 1.063 0 0 0-.753-.312Z"
            fill="#fff"
        />
    </Svg>
)

export default ResetSVG
