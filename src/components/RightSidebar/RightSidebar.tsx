/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { FullScreenHandle } from "react-full-screen";
import { checkAction } from "../../utils/checkAction";
import { StateType } from "../Editor/Editor";
import "./RightSidebar.css";

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
  handleScreen: FullScreenHandle;
};

export const RightSidebar: FC<Props> = ({ setState, state, handleScreen }) => {
  const defaultParams = {
    showAlign: false,
    showColor: false,
    showExport: false,
    showFont: false,
    showLayers: false,
    showLink: false,
    showPatterns: false,
    showTransform: false,
    showFullscreen: false,
  };

  const items = [
    {
      iconSrc: "/img/icons/right/export.svg",
      label: "Export",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;

        setState &&
          setState({
            ...state,
            rightDock: {
              ...defaultParams,
              showExport: state?.rightDock && !state?.rightDock.showExport,
            },
          });
      },
      href: "/",
      disabled: false,
    },
    {
      iconSrc: "/img/icons/right/transform.svg",
      label: "Transform",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        setState &&
          setState({
            ...state,
            rightDock: {
              ...defaultParams,
              showTransform:
                state?.rightDock && !state?.rightDock.showTransform,
            },
          });
      },
      href: "",
      disabled: false,
    },
    {
      iconSrc: "/img/icons/right/layers.svg",
      label: "Layers",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        console.log("Arrow");
      },
      href: "",
      disabled: true,
    },
    {
      iconSrc: "/img/icons/right/color-picker.svg",
      label: "Color",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        setState &&
          setState({
            ...state,
            rightDock: {
              ...defaultParams,
              showColor: state?.rightDock && !state?.rightDock.showColor,
            },
          });
      },
      href: "",
      cursor: "text",
      disabled: false,
    },
    {
      iconSrc: "/img/icons/right/text.svg",
      label: "Font",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        setState &&
          setState({
            ...state,
            rightDock: {
              ...defaultParams,
              showFont: state?.rightDock && !state?.rightDock.showFont,
            },
          });
      },
      disabled: true,
    },
    {
      iconSrc: "/img/icons/right/link.svg",
      label: "Link",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        console.log("Arrow");
      },
      href: "",
      disabled: true,
    },
    {
      iconSrc: "/img/icons/right/align.svg",
      label: "Align",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        setState &&
          setState({
            ...state,
            rightDock: {
              ...defaultParams,
              showAlign: state?.rightDock && !state?.rightDock.showAlign,
            },
          });
      },
      href: "",
      disabled: true,
    },
    {
      iconSrc: "/img/icons/right/patterns.svg",
      label: "Patterns",
      action: () => {
        if (!checkAction.isSelectableOneItem(state)) return;
        setState &&
          setState({
            ...state,
            rightDock: {
              ...defaultParams,
              showPatterns: state?.rightDock && !state?.rightDock.showPatterns,
            },
          });
      },
      href: "",
      cursor: "text",
      disabled: true,
    },
  ];
  return (
    <div className="right-sidebar">
      <div className="right-sidebar__inner">
        <div
          className="right-sidebar__play--inner"
          onClick={handleScreen.enter}
        >
          <div className="right-sidebar__play"></div>
        </div>
        <ul className="right-sidebar__items">
          {items.map((item, index) => {
            return (
              <li
                className="right-sidebar__item"
                key={index}
                onClick={item.action}
              >
                <a
                  className={`right-sidebar__link ${
                    item.disabled || !checkAction.isSelectableOneItem(state)
                      ? "right-sidebar__link--disabled"
                      : ""
                  }`}
                >
                  <div
                    className="right-sidebar__icon"
                    style={{
                      width: "22px",
                      height: "22px",
                      background: `url(${item.iconSrc})`,
                    }}
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
