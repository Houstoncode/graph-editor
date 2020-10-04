import React, { CSSProperties, FC } from "react";
import { Component } from "./ComponentEditor.type";

type Props = {
  component: Component;
};

export const ComponentEditor: FC<Props> = ({ component }: Props) => {
  const isText = component.type === "text";

  const transform = { x: component.x, y: component.y };

  const cssProps = {
    ...component,
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  };

  return (
    <div
      className="moveable"
      id={component.id}
      suppressContentEditableWarning={true}
      contentEditable={isText}
      style={{ ...(cssProps as CSSProperties) }}
    >
      {isText && component.text}
      {!isText && <div></div>}
    </div>
  );
};
