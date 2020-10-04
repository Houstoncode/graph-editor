import { CSSProperties } from "react";

export type Component = {
  type: "text" | "component";
  id: string;
  x?: number;
  y?: number;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  borderRadius?: number;
  backgroundColor?: string;
  visibility?: "hidden" | "visible";
  justifyContent?: CSSProperties["justifyContent"];
  alignContent?: CSSProperties["alignContent"];
  fontFamily?: CSSProperties["fontFamily"];
  fontSize?: CSSProperties["fontSize"];
  textAlign?: CSSProperties["textAlign"];
  fontWeight?: CSSProperties["fontWeight"];
  color?: CSSProperties["color"];
  textDecoration?: CSSProperties["textDecoration"];
  text?: string;
};
