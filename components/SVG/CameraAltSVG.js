import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const CameraAltSVG = (props) => (
    <Svg
        width={42}
        height={42}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M16.45 18.375 24.798 3.92A18.035 18.035 0 0 0 21 3.5c-4.2 0-8.05 1.487-11.06 3.938l6.405 11.112.105-.175Zm21.245-2.625c-1.61-5.11-5.513-9.205-10.5-11.095L20.79 15.75h16.905Zm.455 1.75H25.043l.507.875 8.33 14.438C36.75 29.697 38.5 25.566 38.5 21c0-1.207-.123-2.363-.35-3.5ZM14.945 21 8.12 9.187C5.268 12.303 3.5 16.434 3.5 21c0 1.207.123 2.363.35 3.5h13.107L14.945 21Zm-10.64 5.25c1.61 5.11 5.513 9.205 10.5 11.095L21.21 26.25H4.305Zm19.723 0-6.825 11.83c1.224.263 2.485.42 3.797.42 4.2 0 8.05-1.487 11.06-3.938L25.655 23.45l-1.628 2.8Z"
                fill="#000"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h42v42H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default CameraAltSVG
