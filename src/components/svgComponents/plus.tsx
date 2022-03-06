import * as React from "react";
import Svg, { Rect } from "react-native-svg";
import { StyleSheet } from "react-native";

const PlusSVG = (props: any) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x="10" width="3" height="23" rx="1.5" fill="#2675EC" />
      <Rect
        x="23"
        y="10"
        width="3"
        height="23"
        rx="1.5"
        transform="rotate(90 23 10)"
        fill="#2675EC"
      />
    </Svg>
  );
};

export default PlusSVG;
