import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CropSVG = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17 23v-4H7c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 5 17V7H1V5h4V1h2v16h16v2h-4v4h-2Zm0-8V7H9V5h8c.55 0 1.021.196 1.413.588.391.391.587.862.587 1.412v8h-2Z"
            fill="#fff"
        />
    </Svg>
)

export default CropSVG
