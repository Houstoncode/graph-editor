import Guides from "@scena/react-guides";
import { ref } from "framework-utils";
import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { FullScreen, FullScreenHandle } from "react-full-screen";
import { ComponentEditor } from "../ComponentEditor/ComponentEditor";
import { Component } from "../ComponentEditor/ComponentEditor.type";
import "./Editor.css";
import { PanelEditor } from "../PanelEditor/PanelEditor";
import { checkAction } from "../../utils/checkAction";
import { entityHandler } from "../../utils/entityHandler";

type GuidesType = {
  vertical: Guides | null;
  horizontal: Guides | null;
};

const guides: GuidesType = {
  vertical: null,
  horizontal: null,
};

export type RightDockItem = {
  showExport?: boolean;
  showTransform?: boolean;
  showLayers?: boolean;
  showColor?: boolean;
  showFont?: boolean;
  showLink?: boolean;
  showAlign?: boolean;
  showPatterns?: boolean;
  showFullscreen?: boolean;
};

export type StateType =
  | {
      cursor?: CSSProperties["cursor"];
      action?: "create-text" | "create-rectangle" | "moveable" | "rotatable";
      color?: string;
      activeMenu?: Number;
      components?: Component[];
      rightDock?: RightDockItem;
    }
  | undefined;

type Props = {
  state?: StateType;
  setState?: (state: StateType) => void;
  handleScreen: FullScreenHandle;
};

export const Editor: FC<Props> = ({ state, setState, handleScreen }) => {
  const [targets, setTargets] = useState<Array<HTMLElement | SVGElement>>();
  const [frameMap] = React.useState(() => new Map());
  const [horizontalGuides, setHorizontalGuides] = useState<number[]>();
  const [verticalGuides, setVerticalGuides] = useState<number[]>();
  const selectoRef = React.useRef<Selecto>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  useEffect(() => {
    guides.vertical?.resize();
    guides.horizontal?.resize();
    window.addEventListener("resize", () => {
      guides.vertical?.resize();
      guides.horizontal?.resize();
    });
  }, []);

  const { isCreateRectangle } = checkAction;
  const { createRectangle } = entityHandler;

  return (
    <div className="editor">
      <div className="box" />
      <div className="ruler--horizontal">
        <Guides
          ref={ref(guides, "horizontal")}
          onChangeGuides={({ guides }) => {
            setHorizontalGuides(guides);
          }}
          displayDragPos
        />
      </div>
      <div className="ruler--vertical">
        <Guides
          ref={ref(guides, "vertical")}
          type="vertical"
          onChangeGuides={({ guides }) => {
            setVerticalGuides(guides);
          }}
          displayDragPos
        />
      </div>

      <FullScreen
        handle={handleScreen}
        onChange={(status) => {
          setState &&
            setState({
              ...state,
              rightDock: { ...state?.rightDock, showFullscreen: status },
            });
        }}
      >
        <div className="editor__inner" style={{ cursor: state?.cursor }}>
          <div className="editor__container" ref={editorRef}>
            {state?.components &&
              state.components.map((component, index) => {
                return <ComponentEditor key={index} component={component} />;
              })}
            <Moveable
              ref={moveableRef}
              snappable={true}
              draggable={!state?.rightDock?.showFullscreen}
              snapCenter={true}
              snapHorizontal={true}
              snapVertical={true}
              snapDigit={100}
              snapThreshold={30}
              isDisplaySnapDigit={true}
              target={targets}
              horizontalGuidelines={horizontalGuides}
              verticalGuidelines={verticalGuides}
              elementGuidelines={targets}
              bounds={{
                left: 0,
                right: window.innerWidth - 290,
                top: 0,
                bottom: window.innerHeight,
              }}
              onClick={(e) => {
                e.target.focus();
              }}
              onClickGroup={(e) => {
                selectoRef.current &&
                  selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
              }}
              onDragStart={(e) => {
                const target = e.target;

                if (!frameMap.has(target)) {
                  frameMap.set(target, {
                    translate: [0, 0],
                  });
                }
                const frame = frameMap.get(target);

                e.set(frame.translate);
              }}
              onDrag={(e) => {
                const target = e.target;
                const frame = frameMap.get(target);

                frame.translate = e.beforeTranslate;
                target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
              }}
              onDragGroupStart={(e) => {
                e.events.forEach((ev) => {
                  const target = ev.target;

                  if (!frameMap.has(target)) {
                    frameMap.set(target, {
                      translate: [0, 0],
                    });
                  }
                  const frame = frameMap.get(target);

                  ev.set(frame.translate);
                });
              }}
              onDragGroup={(e) => {
                e.events.forEach((ev) => {
                  const target = ev.target;
                  const frame = frameMap.get(target);

                  frame.translate = ev.beforeTranslate;
                  target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
                });
              }}
            ></Moveable>
          </div>
        </div>
      </FullScreen>
      <PanelEditor state={state} setState={setState} />
      <Selecto
        ref={selectoRef}
        dragContainer={".editor__inner"}
        selectableTargets={[".editor__container .moveable"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        ratio={0}
        onDragStart={(e) => {
          if (state?.rightDock?.showFullscreen) return;

          const moveable = moveableRef.current;
          const target = e.inputEvent.target;
          if (
            (moveable && moveable.isMoveableElement(target)) ||
            (targets && targets.some((t) => t === target || t.contains(target)))
          ) {
            e.stop();
          }
        }}
        onSelect={(e) => {
          if (state?.rightDock?.showFullscreen) return;
          if (isCreateRectangle(state)) {
            setTargets(undefined);
            return;
          }
          setTargets(e.selected);
        }}
        onSelectEnd={(e) => {
          if (state?.rightDock?.showFullscreen) return;
          if (isCreateRectangle(state)) {
            console.log("Create rectangle");
            createRectangle(e, { state, setState });
            return;
          }
          const moveable = moveableRef.current;
          if (e.isDragStart) {
            e.inputEvent.preventDefault();

            setTimeout(() => {
              moveable && moveable.dragStart(e.inputEvent);
            });
          }
        }}
      ></Selecto>
    </div>
  );
};
