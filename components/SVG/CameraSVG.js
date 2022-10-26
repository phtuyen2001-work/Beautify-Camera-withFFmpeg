import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const CameraSVG = (props) => (
    <Svg
        width={42}
        height={42}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)" fill="#fff">
            <Path d="M21 26.6a5.6 5.6 0 1 0 0-11.2 5.6 5.6 0 0 0 0 11.2Z" />
            <Path d="M15.75 3.5 12.547 7H7a3.51 3.51 0 0 0-3.5 3.5v21A3.51 3.51 0 0 0 7 35h28a3.51 3.51 0 0 0 3.5-3.5v-21A3.51 3.51 0 0 0 35 7h-5.547L26.25 3.5h-10.5ZM21 29.75c-4.83 0-8.75-3.92-8.75-8.75s3.92-8.75 8.75-8.75 8.75 3.92 8.75 8.75-3.92 8.75-8.75 8.75Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h42v42H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default CameraSVG
