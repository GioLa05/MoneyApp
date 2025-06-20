import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


function Bell(props: SvgProps) {
  return (
    <Svg
      width={21}
      height={25}
      viewBox="0 0 21 25"
      fill="none"
      {...props}
    >
      <Path
        d="M13.545 20.864A3.146 3.146 0 0110.41 24a3.146 3.146 0 01-3.136-3.136"
        stroke={props.stroke || "#3A3A3A"}
        strokeWidth={1.04545}
        strokeLinecap="square"
      />
      <Path
        clipRule="evenodd"
        d="M17.727 13.546V8.318C17.727 4.293 14.434 1 10.41 1 6.384 1 3.091 4.293 3.091 8.318v5.228C3.09 17.727 1 20.864 1 20.864h18.818s-2.09-3.137-2.09-7.319z"
        stroke={props.stroke || "#3A3A3A"}
        strokeWidth={1.04545}
        strokeLinecap="square"
      />
    </Svg>
  )
}

export default Bell
