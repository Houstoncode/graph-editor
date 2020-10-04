import KeyController from "keycon";
import { StateType } from "../components/Editor/Editor";

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
};

export const keyController = ({ state, setState }: Props): void => {
  const keycon = new KeyController();

  keycon.keydown("v", (e) => {
    setState && setState({ ...state, action: "moveable", cursor: "default" });
  });

  keycon.keydown("t", (e) => {
    setState && setState({ ...state, action: "create-text", cursor: "text" });
  });

  keycon.keydown("r", (e) => {
    setState &&
      setState({ ...state, action: "create-rectangle", cursor: "crosshair" });
  });
};
