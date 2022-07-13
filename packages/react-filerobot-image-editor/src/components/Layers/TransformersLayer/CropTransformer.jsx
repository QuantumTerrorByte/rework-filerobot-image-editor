/** External Dependencies */
import React, { useEffect, useRef, useState } from "react";
import { Ellipse, Image, Rect, Transformer } from "react-konva";
import Konva from "konva";

/** Internal Dependencies */
import { useStore } from "hooks";
import { BACKGROUND_RESIZE, MOVE_BACKGROUND, SET_CROP, SET_FEEDBACK, SET_SHOWN_IMAGE_DIMENSIONS } from "actions";
import {
  CUSTOM_CROP,
  ELLIPSE_CROP,
  FEEDBACK_STATUSES,
  ORIGINAL_CROP,
  TOOLS_IDS
} from "utils/constants";
import { boundDragging, boundResizing } from "./cropAreaBounding";

const CropTransformer = () => {
  const {
    dispatch,
    theme,
    designLayer,
    originalImage,
    shownImageDimensions,
    adjustments: { crop = {}, isFlippedX, isFlippedY } = {},
    resize = {},
    config,
    t,
    backgroundX,
    backgroundY,
    initialCanvasWidth,
    initialCanvasHeight,
    canvasHeight,
    canvasScale,
    canvasWidth,
    backgroundWidthAddon,
    backgroundHeightAddon,
    cropRatio,
    backgroundRef
  } = useStore();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [backgroundStartPoint, setBackgroundStartPoint] = useState({});

  const cropShapeRef = useRef();
  const cropTransformerRef = useRef();
  const tmpImgNodeRef = useRef();
  const shownImageDimensionsRef = useRef();
  const [startPoint, setStartPoint] = useState({});

  const cropConfig = config[TOOLS_IDS.CROP];

  const isCustom = cropRatio === CUSTOM_CROP;
  const isEllipse = cropRatio === ELLIPSE_CROP;

  const getProperCropRatio = () =>
    cropRatio === ORIGINAL_CROP
      ? originalImage.width / originalImage.height
      : cropRatio;

  //========================================== initial crop state

  useEffect(() => {
    const cropHeight = canvasHeight * 0.75;
    const cropWidth = cropHeight / cropRatio;

    const newCrop = {
      x: (canvasWidth - cropWidth) / 2,
      y: (canvasHeight - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight
    };
    debugger
    dispatch({
      type: SET_CROP,
      payload: {
        ...crop,
        ...newCrop,
        dismissHistory: false
      }
    });
  }, [
    crop,
    designLayer,
    originalImage,
    cropRatio,
    canvasWidth,
    canvasHeight
  ]); // todo add dependencies

  //==========================================

  useEffect(() => {
    if (shownImageDimensions) {
      shownImageDimensionsRef.current = shownImageDimensions;
    }
  }, [shownImageDimensions]);

  if ( !designLayer) {
    return null;
  }

  const enabledAnchors = isCustom || isEllipse
    ? undefined
    : ["top-left", "bottom-left", "top-right", "bottom-right"];

  let attrs;
  if ( !crop.width && !crop.height) {
    const scaleFactor =
      shownImageDimensions.scaledBy < 1 ? shownImageDimensions.scaledBy : 1;
    const unscaledImgDimensions = {
      ...shownImageDimensions,
      width: shownImageDimensions.width / scaleFactor,
      height: shownImageDimensions.height / scaleFactor
    };
    attrs = boundResizing(
      unscaledImgDimensions,
      { ...unscaledImgDimensions, x: 0, y: 0 },
      { ...unscaledImgDimensions, abstractX: 0, abstractY: 0 },
      isCustom || isEllipse ? false : getProperCropRatio(),
      cropConfig
    );
  } else {
    attrs = crop;
  }

  const { x = 0, y = 0, width, height } = attrs;

  const cropShapeProps = {
    x: isFlippedX ? shownImageDimensions.width - x - width : x,
    y: isFlippedY ? shownImageDimensions.height - y - height : y,
    ref: cropShapeRef,
    fill: "#FFFFFF",
    scaleX: 1,
    scaleY: 1,
    globalCompositeOperation: "destination-out"
  };

  const selectBackground = (e) => {
    const sp = { x: e.evt.x, y: e.evt.y };
    console.log("SELECT");
    setIsMouseDown(true);
    setBackgroundStartPoint({ x: backgroundX, y: backgroundY });
    setStartPoint(sp);
  };
  const unselectBackground = (e) => {
    console.log("UN SELECT");
    setIsMouseDown(false);
    const changePosition = { x: e.evt.x - startPoint.x, y: e.evt.y - startPoint.y };
    dispatch({
      type: MOVE_BACKGROUND,
      payload: {
        x: backgroundStartPoint.x + changePosition.x,
        y: backgroundStartPoint.y + changePosition.y
      }
    });
  };
  const moveBackground = (e) => {
    if (isMouseDown) {
      const changePosition = { x: e.evt.x - startPoint.x, y: e.evt.y - startPoint.y };
      console.log("changePosition");
      if (backgroundRef?.current) {
        backgroundRef.current.x(backgroundStartPoint.x + changePosition.x + (canvasWidth / 2));
        backgroundRef.current.y(backgroundStartPoint.y + changePosition.y + (canvasHeight / 2));
      }
      // dispatch({
      //   type: MOVE_BACKGROUND,
      //   payload: {
      //     x: backgroundStartPoint.x + changePosition.x,
      //     y: backgroundStartPoint.y + changePosition.y
      //   }
      // });
    }
  };
  const resizeBackground = (e) => {
    console.log("RESIZE");
    let direction = e.evt.deltaY > 0;
    dispatch(
      {
        type: BACKGROUND_RESIZE,
        payload: {
          height: backgroundHeightAddon + (direction ? 10 : -10),
          width: backgroundWidthAddon + (direction ? 10 : -10)
        }
      }
    );
  };
  // ALT is used to center scaling
  console.log(canvasWidth + " " + canvasHeight + " " + canvasScale);
  return (
    <>
      <Rect
        x={0}
        y={0}
        width={canvasWidth}
        height={canvasHeight}
        fill="black"
        opacity={0.5}
        ref={tmpImgNodeRef}

        onMouseDown={selectBackground}
        onMouseUp={unselectBackground}
        //todo optimization with ref
        onMouseMove={moveBackground}
        onWheel={resizeBackground}
      />
      {isEllipse ? (
        <Ellipse
          {...cropShapeProps}
          radiusX={width / 2}
          radiusY={height / 2}
          offset={{
            x: -width / 2,
            y: -height / 2
          }}
        />
      ) : (
        <Rect {...cropShapeProps}
              width={width}
              height={height}
              onMouseDown={selectBackground}
              onMouseUp={unselectBackground}
              onMouseMove={moveBackground}
              onWheel={resizeBackground}
        />
      )}
      <Transformer
        centeredScaling={false}
        flipEnabled={false}
        rotateEnabled={false}
        nodes={cropShapeRef.current ? [cropShapeRef.current] : []}
        anchorSize={0}
        anchorCornerRadius={7}
        enabledAnchors={enabledAnchors}
        ignoreStroke={false}
        anchorStroke={theme.palette["accent-primary"]}
        anchorFill={theme.palette["access-primary"]}
        borderStroke={theme.palette["accent-primary"]}
        anchorStrokeWidth={2}
        borderStrokeWidth={2}
        borderDash={[2]}
        keepRatio={ !isCustom || !isEllipse}
        ref={cropTransformerRef}
        boundBoxFunc={(absOldBox, absNewBox) => {
          return boundResizing(
            absOldBox,
            absNewBox,
            shownImageDimensionsRef.current,
            isCustom || isEllipse ? false : getProperCropRatio(),
            cropConfig
          );
        }}
      />
    </>
  );
};

export default CropTransformer;
