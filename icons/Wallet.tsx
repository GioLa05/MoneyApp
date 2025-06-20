import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function Wallet(props: SvgProps) {
  return (
    <Svg
      width={26}
      height={25}
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_1098_28)"
        stroke={props.stroke || "#3A3A3A"}
        strokeWidth={1.05}
        strokeLinecap="square"
      >
        <Path d="M22.6 12.708V6.042H3.4c-1.326 0-2.4-1.12-2.4-2.5v17.5c0 1.84 1.433 3.333 3.2 3.333h18.4v-6.667" />
        <Path
          clipRule="evenodd"
          d="M25 17.708h-5.6c-1.326 0-2.4-1.119-2.4-2.5 0-1.38 1.074-2.5 2.4-2.5H25v5z"
        />
        <Path d="M17.8 2.708V1.042H3.4c-1.326 0-2.4 1.119-2.4 2.5 0 1.38 1.074 2.5 2.4 2.5" />
      </G>
      <Defs>
        <ClipPath id="clip0_1098_28">
          <Path fill="#fff" d="M0 0H26V25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Wallet