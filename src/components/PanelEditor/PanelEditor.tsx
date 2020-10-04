import React, { FC } from "react";
import "./PanelEditor.css";
import { RightDockItem, StateType } from "../Editor/Editor";
import { ColorResult, SketchPicker } from "react-color";

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
};

export const PanelEditor: FC<Props> = ({ state, setState }) => {
  const handleColor = (color: ColorResult) => {
    setState && setState({ ...state, color: color.hex });
  };

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

  const handleCloseWindow = () => {
    setState && setState({ ...state, rightDock: defaultParams });
  };

  const rightDock: RightDockItem | undefined = state?.rightDock;
  return (
    <div className="panel-editor">
      <div className="panel-editor__items">
        {rightDock?.showExport && (
          <div className="moveable panel-editor__item panel-editor__small">
            <div className="panel-item__header">
              <span>Export</span>
              <div
                className="panel-item__header--icon"
                onClick={() => handleCloseWindow()}
              />
            </div>
            <div className="panel-body">
              <div className="panel-body__item panel-body-export__item">
                <span className="panel-body__link">.JPG</span>
              </div>
              <div className="panel-body__item panel-body-export__item">
                <span className="panel-body__link">.PNG</span>
              </div>
              <div className="panel-body__item panel-body-export__item">
                <span className="panel-body__link">.SVG</span>
              </div>
              <div className="panel-body__item panel-body-export__item">
                <span className="panel-body__link">.PDF</span>
              </div>
            </div>
          </div>
        )}
        {rightDock?.showTransform && (
          <div className="moveable panel-editor__item panel-editor__medium">
            <div className="panel-item__header">
              <span>Transform</span>
              <div
                className="panel-item__header--icon"
                onClick={() => handleCloseWindow()}
              />
            </div>
            <div className="panel-body">
              <div className="panel-body__item panel-body-transform__item">
                <div className="panel-body-input__group">
                  <label htmlFor="x">X</label>
                  <input id="x" type="text" />
                </div>
                <div className="panel-body-input__group">
                  <label htmlFor="y">Y</label>
                  <input id="y" type="text" />
                </div>
              </div>
              <div className="panel-body__item panel-body-transform__item">
                <div className="panel-body-input__group">
                  <label htmlFor="width">Width</label>
                  <input id="width" type="text" />
                </div>
                <div className="panel-body-input__group">
                  <label htmlFor="height">Height</label>
                  <input id="height" type="text" />
                </div>
              </div>
              <div className="panel-body__item panel-body-transform__item">
                <div className="panel-body-input__group">
                  <label htmlFor="br">Border radius</label>
                  <input id="br" type="text" />
                </div>
                <div className="panel-body-input__group">
                  <label htmlFor="rotate">Rotate</label>
                  <input id="rotate" type="text" />
                </div>
              </div>
            </div>
          </div>
        )}
        {rightDock?.showColor && (
          <div className="moveable panel-editor__item panel-editor__large">
            <div className="panel-item__header">
              <span>Color</span>
              <div
                className="panel-item__header--icon"
                onClick={() => handleCloseWindow()}
              />
            </div>
            <div className="panel-body --color">
              <SketchPicker
                color={state && state.color}
                onChangeComplete={handleColor}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
