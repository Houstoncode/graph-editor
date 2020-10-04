import React, { useEffect, useState } from "react";
import "./App.css";
import { LeftSidebar } from "./components/LeftSidebar/LeftSidebar";
import { Editor, StateType } from "./components/Editor/Editor";
import { RightSidebar } from "./components/RightSidebar/RightSidebar";
import { useFullScreenHandle } from "react-full-screen";
import { keyController } from "./utils/keyController";
import crypto from "crypto";
import KeyController from "keycon";

const initialState: StateType = {
  cursor: "default",
  action: "moveable",
  components: [
    {
      id: crypto.randomBytes(32).toString("hex"),
      x: 150,
      y: 150,
      type: "text",
      text: "Тестовый",
      textAlign: "center",
      width: 150,
      height: 150,
      borderRadius: 0,
      justifyContent: "center",
      alignContent: "center",
    },
    {
      id: crypto.randomBytes(32).toString("hex"),
      x: 150,
      y: 150,
      type: "component",
      backgroundColor: "#fff",
      text: "",
      textAlign: "center",
      width: 150,
      height: 150,
      borderRadius: 0,
      justifyContent: "center",
      alignContent: "center",
    },
  ],
  rightDock: {
    showAlign: false,
    showExport: false,
    showColor: false,
    showFont: false,
    showLayers: false,
    showLink: false,
    showPatterns: false,
    showTransform: false,
    showFullscreen: false,
  },
};

export default () => {
  const [state, setState] = useState<StateType>(initialState);
  const handle = useFullScreenHandle();

  useEffect(() => {
    keyController({ state, setState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keycon.keydown("delete", () => {
  //   const selectComponents = state?.currentSelected;
  //   if (
  //     !selectComponents ||
  //     (selectComponents && selectComponents?.length <= 0)
  //   )
  //     return;

  //   const idSelectComponents = selectComponents?.map(
  //     (selectComponent) => selectComponent.id
  //   );

  //   const newComponents = state?.components?.filter((component) =>
  //     idSelectComponents?.find((id) => id !== component.id)
  //   );
  //   setState && setState({ ...state, components: newComponents });
  // });

  return (
    <div>
      <LeftSidebar state={state} setState={setState} />
      <Editor state={state} setState={setState} handleScreen={handle} />
      <RightSidebar handleScreen={handle} state={state} setState={setState} />
    </div>
  );
};
