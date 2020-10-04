import React, { FC, FormEvent } from "react";
import "./PanelEditor.css";
import { RightDockItem, StateType } from "../Editor/Editor";
import { ColorResult, SketchPicker } from "react-color";
import { checkAction } from "../../utils/checkAction";
import { entityHandler } from "../../utils/entityHandler";
import { Component } from "../ComponentEditor/ComponentEditor.type";

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
};

export const PanelEditor: FC<Props> = ({ state, setState }) => {
  if (!setState) return null;

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

  if (!checkAction.isSelectableOneItem(state)) return null;

  const selectedIdComponent =
    state && state.currentSelected && state.currentSelected[0].id;

  if (!selectedIdComponent) return null;

  const selectedComponent = entityHandler.findComponent(selectedIdComponent, {
    state,
    setState,
  });

  if (!selectedComponent) return null;

  const handleCloseWindow = () => {
    setState({ ...state, rightDock: defaultParams });
  };

  const handleUpdateNumberItemInput = (e: FormEvent<HTMLInputElement>) => {
    const newComponent: Component = {
      ...selectedComponent,
      [e.currentTarget.id]: parseInt(e.currentTarget.value),
    };

    const newComponents = state?.components?.filter(
      (component) => component.id !== newComponent.id
    );
    newComponents?.push(newComponent);
    setState({ ...state, components: newComponents });
  };

  const handleColor = (color: ColorResult) => {
    const newComponent: Component = {
      ...selectedComponent,
      [selectedComponent.type === "text"
        ? "color"
        : "backgroundColor"]: color.hex,
    };

    const newComponents = state?.components?.filter(
      (component) => component.id !== newComponent.id
    );
    newComponents?.push(newComponent);
    setState({ ...state, color: color.hex, components: newComponents });
  };

  const rightDock: RightDockItem | undefined = state?.rightDock;
  return (
    <div className="panel-editor">
      <div className="panel-editor__items">
        {rightDock?.showExport && checkAction.isSelectableOneItem(state) && (
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
        {rightDock?.showTransform && checkAction.isSelectableOneItem(state) && (
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
                  <input
                    id="x"
                    type="number"
                    defaultValue={selectedComponent.x || 0}
                    onChange={handleUpdateNumberItemInput}
                  />
                </div>
                <div className="panel-body-input__group">
                  <label htmlFor="y">Y</label>
                  <input
                    id="y"
                    type="number"
                    defaultValue={selectedComponent.y || 0}
                    onChange={handleUpdateNumberItemInput}
                  />
                </div>
              </div>
              <div className="panel-body__item panel-body-transform__item">
                <div className="panel-body-input__group">
                  <label htmlFor="width">Width</label>
                  <input
                    id="width"
                    type="number"
                    defaultValue={selectedComponent.width || 0}
                    onChange={handleUpdateNumberItemInput}
                  />
                </div>
                <div className="panel-body-input__group">
                  <label htmlFor="height">Height</label>
                  <input
                    id="height"
                    type="number"
                    defaultValue={selectedComponent.height || 0}
                    onChange={handleUpdateNumberItemInput}
                  />
                </div>
              </div>
              <div className="panel-body__item panel-body-transform__item">
                <div className="panel-body-input__group">
                  <label htmlFor="br">Border radius</label>
                  <input
                    id="borderRadius"
                    type="number"
                    defaultValue={selectedComponent.borderRadius || 0}
                    onChange={handleUpdateNumberItemInput}
                  />
                </div>
                <div className="panel-body-input__group">
                  <label htmlFor="rotate">Rotate</label>
                  <input id="rotate" type="number" />
                </div>
              </div>
            </div>
          </div>
        )}
        {rightDock?.showColor && checkAction.isSelectableOneItem(state) && (
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
