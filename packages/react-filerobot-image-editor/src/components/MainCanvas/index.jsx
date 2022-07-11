/** External Dependencies */
import React, { useCallback, useEffect } from "react";

/** Internal Dependencies */
import { DesignLayer, TransformersLayer } from "components/Layers";
import { AppProviderOverridenValue } from "context";
import { SET_CANVAS_SIZE } from "actions";
import { useResizeObserver, useStore } from "hooks";
import NodeControls from "components/NodeControls";
import CanvasNode from "./CanvasNode";
import { CanvasContainer, StyledOrignalImage } from "./MainCanvas.styled";


const MainCanvas = () => {
  const [observeResize] = useResizeObserver();
  const providedAppContext = useStore();

  useEffect(() => {
    // console.log("---------------------------------------");
    // console.log("canvasHeight: " + providedAppContext.canvasHeight);
    // console.log("canvasWidth: " + providedAppContext.canvasWidth);
    // console.log("canvasScale: " + providedAppContext.canvasScale);
    // console.log("initialCanvasHeight: " + providedAppContext.initialCanvasHeight);
    // console.log("initialCanvasWidth: " + providedAppContext.initialCanvasWidth);
    // console.log(providedAppContext.shownImageDimensions);
  }, [providedAppContext.shownImageDimensions]);


  const setNewCanvasSize = useCallback(
    ({ width: containerWidth, height: containerHeight }) => {
      providedAppContext.dispatch({
        type: SET_CANVAS_SIZE,
        payload: {
          canvasWidth: containerWidth,
          canvasHeight: containerHeight
        }
      });
    }, []
  );

  const observeCanvasContainerResizing = useCallback((element) => {
    observeResize(element, setNewCanvasSize);
  }, []);

  return (
    <CanvasContainer
      className="FIE_canvas-container"
      ref={observeCanvasContainerResizing}
    >
      { !providedAppContext.textIdOfEditableContent && <NodeControls />}
      {providedAppContext.isShowOriginalImage && (
        <StyledOrignalImage
          className="FIE_original-image-compare"
          src={providedAppContext.originalImage.src}
        />
      )}
      <CanvasNode>
        <AppProviderOverridenValue overridingValue={providedAppContext}>
          <DesignLayer />
          <TransformersLayer />
        </AppProviderOverridenValue>
      </CanvasNode>
    </CanvasContainer>
  );
};

export default MainCanvas;
