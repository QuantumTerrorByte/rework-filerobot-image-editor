/** External Dependencies */
import React from "react";
import { Layer } from "react-konva";

/** Internal Dependencies */
import { useStore } from "hooks";
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from "utils/constants";
import CropTransformer from "./CropTransformer";
import NodesTransformer from "./NodesTransformer";

// NodesTransformer transformer for addons(annotations)
// CropTransformer separate transformer for crop tab
const TransformersLayer = () => {
  const { dispatch, toolId, shownImageDimensions, canvasWidth, canvasHeight } = useStore();
  return (
    <Layer
      id={TRANSFORMERS_LAYER_ID}
      x={0}
      y={0}
      // scaleX={1.2}
      width={canvasWidth*2}
      height={canvasHeight*2}
    >
      <NodesTransformer />
      {toolId === TOOLS_IDS.CROP && <CropTransformer />}
    </Layer>
  );
};

export default TransformersLayer;
