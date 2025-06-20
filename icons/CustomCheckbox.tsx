import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  disabled?: boolean;
  [key: string]: any;
};

const CustomCheckbox = ({ disabled = false, ...props }: Props) => (
  <Svg width={18} height={13} fill="none" {...props}>
    <Path
      fill={disabled ? "#C8C8C8" : "#2743FD"}
      d="M17.736.26a.91.91 0 0 0-1.272 0L5.68 10.862 1.536 6.787a.91.91 0 0 0-1.272 0 .875.875 0 0 0 0 1.252l4.78 4.702a.911.911 0 0 0 1.273 0l11.42-11.23a.875.875 0 0 0 0-1.252Z"
    />
  </Svg>
);

export default CustomCheckbox;
