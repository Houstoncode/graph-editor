import { OnSelect } from "react-selecto";
import { StateType } from "../components/Editor/Editor";
import { Component } from "../components/ComponentEditor/ComponentEditor.type";

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
};

export const entityHandler = {
  createRectangle(event: OnSelect, { state, setState }: Props) {
    const newElement: Component = {
      type: "component",
      x: event.inputEvent.x,
      y: event.inputEvent.y,
      width: event.rect.width,
      height: event.rect.height,
      backgroundColor: "#fff",
    };

    setState && setState({ ...state, components: [...state?.components] });
  },
};
