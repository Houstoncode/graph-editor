import { StateType } from "../components/Editor/Editor";

export const checkAction = {
  isMoveable: (state: StateType) => {
    return state?.action === "moveable";
  },
  isCreateText: (state: StateType) => {
    return state?.action === "create-text";
  },
  isCreateRectangle: (state: StateType) => {
    return state?.action === "create-rectangle";
  },
  isRotatable: (state: StateType) => {
    return state?.action === "rotatable";
  },
};
