import React, { useEffect, useRef } from "react";
import Moveable from "react-moveable";
import "./App.css";
import { setAlias, Frame } from "scenejs";
import Guides from "@scena/react-guides";
import { ref } from "framework-utils";

setAlias("tx", ["transform", "translateX"]);
setAlias("ty", ["transform", "translateY"]);
setAlias("tz", ["transform", "translateZ"]);
setAlias("rotate", ["transform", "rotate"]);
setAlias("sx", ["transform", "scaleX"]);
setAlias("sy", ["transform", "scaleY"]);
setAlias("matrix3d", ["transform", "matrix3d"]);

type GuidesType = {
  vertical?: Guides;
  horizontal?: Guides;
  allResize: () => void;
};

export default () => {
  const itemMap: Map<HTMLElement | SVGElement, Frame> = new Map();
  const guides: GuidesType = {
    vertical: undefined,
    horizontal: undefined,
    allResize() {
      this.vertical && this.vertical.resize();
      this.horizontal && this.horizontal.resize();
      console.log("Resize");
    },
  };
  const refGuideHorizontal = useRef<Guides>(null);
  const refGuideVertical = useRef<Guides>(null);

  useEffect(() => {
    guides.allResize();
  }, []);
  return (
    <div id="con">
      <div className="guides horizontal">
        <Guides ref={refGuideHorizontal} />
      </div>
      <div className="guides vertical">
        <Guides ref={refGuideVertical} type="vertical" />
      </div>
    </div>
  );
};
