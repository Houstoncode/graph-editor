import { OnDragEnd, OnDragStart } from "react-selecto";
import { Component } from "../components/ComponentEditor/ComponentEditor.type";
import { StateType } from "../components/Editor/Editor";
import crypto from "crypto";

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
};

export const entityHandler = {
  createRectangle(event: OnDragEnd, { state, setState }: Props) {
    if (!setState) return;

    const newElement: Component = {
      type: "component",
      id: crypto.randomBytes(32).toString("hex"),
      x: 0,
      y: 0,
      width: event.rect.width,
      height: event.rect.height,
      backgroundColor: "#fff",
    };

    const newComponents = state?.components?.map((component) => component);
    newComponents?.push(newElement);

    setState({ ...state, components: newComponents });
  },
  createText(event: OnDragStart, { state, setState }: Props) {
    if (!setState) return;

    const newElement: Component = {
      type: "text",
      id: crypto.randomBytes(32).toString("hex"),
      x: 0,
      y: 0,
      text: "Lorem ipsum",
      width: "100px",
      height: "20px",
      color: "#000",
    };

    const newComponents = state?.components?.map((component) => component);
    newComponents?.push(newElement);

    setState({ ...state, components: newComponents });
  },
  findComponent(id: string | undefined, { state, setState }: Props) {
    return state?.components?.find((component) => component.id === id);
  },
};
