import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CloseSVG = (props) => (
  <Svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m13.41 12.222 4.3-4.29a1.004 1.004 0 1 0-1.42-1.42l-4.29 4.3-4.29-4.3a1.004 1.004 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1.001 1.001 0 0 0 0-1.42l-4.3-4.29Z"
      fill="#fff"
    />
  </Svg>
)

export default CloseSVG
