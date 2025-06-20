import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function User(props: SvgProps) {
  return (
    <Svg
      width={23}
      height={27}
      viewBox="0 0 23 27"
      fill="none"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M11.318 13.5c-2.9 0-5.25-2.544-5.25-5.682V6.682C6.068 3.544 8.418 1 11.318 1s5.25 2.544 5.25 5.682v1.136c0 3.138-2.35 5.682-5.25 5.682zM21.818 21.94c0-1.761-1.068-3.31-2.629-3.813a25.848 25.848 0 00-7.87-1.218c-3.302 0-6.026.624-7.872 1.218C1.886 18.63.818 20.18.818 21.941V26h21v-4.06z"
        stroke={props.stroke || "#3A3A3A"}
        strokeWidth={1.05}
        strokeLinecap="square"
      />
    </Svg>
  )
}

export default User
