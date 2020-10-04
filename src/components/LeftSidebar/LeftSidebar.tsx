/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FC, MouseEvent } from "react";
import { StateType } from "../Editor/Editor";

import "./LeftSidebar.css";

type Props = {
  state: StateType;
  setState?: (state: StateType) => void;
};

export const LeftSidebar: FC<Props> = ({ state, setState }) => {
  const items = [
    {
      iconSrc: "/img/icons/home.svg",
      action: (e: MouseEvent, index: number) => {},
      href: "/",
    },
    {
      iconSrc: "/img/icons/arrow.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
        setState &&
          setState({ ...state, action: "moveable", cursor: "default" });
      },
      defaultAction: "moveable",
      href: "",
    },
    {
      iconSrc: "/img/icons/addRectangle.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
        setState &&
          setState({
            ...state,
            action: "create-rectangle",
            cursor: "crosshair",
          });
      },
      defaultAction: "create-rectangle",
      href: "",
    },
    {
      iconSrc: "/img/icons/text.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
        setState &&
          setState({ ...state, action: "create-text", cursor: "text" });
      },
      defaultAction: "create-text",
      href: "",
    },
    {
      iconSrc: "/img/icons/pencil.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
      },
      disabled: true,
    },
    {
      iconSrc: "/img/icons/colorPicker.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
      },
      href: "",
      disabled: true,
    },
    {
      iconSrc: "/img/icons/frame.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
      },
      href: "",
      disabled: true,
    },
    {
      iconSrc: "/img/icons/hand.svg",
      action: (e: MouseEvent, index: number) => {
        e.preventDefault();
      },
      href: "",
      disabled: true,
    },
  ];

  return (
    <div className="left_side">
      <div className="left_side__logo" />
      <ul>
        {items.map((item, index) => {
          return (
            <li
              className={`left_side__item ${
                item.defaultAction === state?.action && !item.disabled
                  ? "left_side__item--active"
                  : ""
              }`}
              key={index}
              onClick={(e: MouseEvent) => item.action(e, index)}
            >
              <a
                className={`left_side__link`}
                style={{ background: `url(${item.iconSrc})` }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
