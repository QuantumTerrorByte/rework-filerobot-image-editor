import React, { useEffect } from "react";
import { Layer, Rect } from "react-konva";
import { useStore } from "../../../hooks";

const TemplateLayer = () => {
  const { crop, template } = useStore();
  useEffect(()=>{

  },[template,crop])

  return (
    <Layer>
      <Rect
        // x={180}
        // y={150}
        width={90}
        height={90}
        fill={"red"}
      />
    </Layer>
  );
};

export default TemplateLayer;