import * as React from "react";
import { ClipPath, Defs, G, Path, Svg } from "react-native-svg";

interface ArrowIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowIcon = ({
  width = 19,
  height = 14,
  color = "#fff",
}: ArrowIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 19 14" fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M18.625 6.849a.312.312 0 0 0-.117-.243L11.906.703c-.146-.148-.254-.182-.361-.182-.215 0-.38.147-.38.33 0 .095.028.182.107.243l3.896 3.472 2.334 2.005-2.139-.052H.861c-.205 0-.37.139-.37.33 0 .19.165.33.37.33h14.502l2.139-.044-2.334 1.997-3.896 3.472a.34.34 0 0 0-.108.252c0 .173.166.321.38.321a.393.393 0 0 0 .274-.104l6.69-5.981a.312.312 0 0 0 .117-.243Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h19v13.333H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowIcon;
