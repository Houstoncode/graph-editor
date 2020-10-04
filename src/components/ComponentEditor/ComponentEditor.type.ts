import { CSSProperties } from "react";

export type Component = {
  type: "text" | "component";
  x?: Number;
  y?: Number;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  borderRadius?: Number;
  backgroundColor?: String;
  visibility?: "hidden" | "visible";
  justifyContent?: CSSProperties["justifyContent"];
  alignContent?: CSSProperties["alignContent"];
  fontFamily?: CSSProperties["fontFamily"];
  fontSize?: CSSProperties["fontSize"];
  textAlign?: CSSProperties["textAlign"];
  fontWeight?: CSSProperties["fontWeight"];
  color?: CSSProperties["color"];
  textDecoration?: CSSProperties["textDecoration"];
  text?: String;
};
