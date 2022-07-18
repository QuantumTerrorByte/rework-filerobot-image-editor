/** External Dependencies */
import React, { useCallback, useEffect } from "react";

/** Internal Dependencies */
import { DesignLayer, TransformersLayer } from "components/Layers";
import { AppProviderOverridenValue } from "context";
import { SET_CANVAS_SIZE, SET_RESIZED_ANNO } from "actions";
import { useResizeObserver, useStore } from "hooks";
import NodeControls from "components/NodeControls";
import CanvasNode from "./CanvasNode";
import { StyledCanvasContainer, StyledOrignalImage } from "./MainCanvas.styled";
import TemplateLayer from "../Layers/TemplateLayer/TemplateLayer";
import SizeMapper from "../../custom/SizeMapper";

const MainCanvas = () => {
  const [observeResize] = useResizeObserver();
  const providedAppContext = useStore();
  debugger

  useEffect(() => {
    // console.log("---------------------------------------");
    console.log("canvasHeight: " + providedAppContext.canvasHeight);
    console.log("canvasWidth: " + providedAppContext.canvasWidth);
    console.log("initialCanvasHeight: " + providedAppContext.initialCanvasHeight);
    console.log("initialCanvasWidth: " + providedAppContext.initialCanvasWidth);
    // console.log("canvasScale: " + providedAppContext.canvasScale);
    // console.log(providedAppContext.shownImageDimensions);
  }, [providedAppContext]);

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
    debugger
    if (element) {
      const adaptedAnnotations = SizeMapper.convertMmToPixelsAndAddMargins({
        elements: providedAppContext.annotations,
        canvasHeight: element.clientHeight,
        canvasWidth: element.clientWidth,
        bookFormat: providedAppContext.bookFormat
      });
      providedAppContext.dispatch({
        type: SET_RESIZED_ANNO,
        payload: adaptedAnnotations
      });
    }
    // setNewCanvasSize({ width: element.clientWidth, height: element.clientHeight });
  }, []);

  return (
    <StyledCanvasContainer
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
          <TemplateLayer />
          <TransformersLayer />
        </AppProviderOverridenValue>
      </CanvasNode>
    </StyledCanvasContainer>
  );
};

export default MainCanvas;
