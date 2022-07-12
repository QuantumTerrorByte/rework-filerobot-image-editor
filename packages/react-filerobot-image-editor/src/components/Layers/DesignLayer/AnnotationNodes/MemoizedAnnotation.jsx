/** External Dependencies */
import React, { memo } from "react";
import PropTypes from "prop-types";

/** Internal Dependencies */
import { ANNOTATION_NAMES_TO_COMPONENT } from "./AnnotationNodes.constants";
import { useStore } from "../../../../hooks";
import { TABS_IDS } from "../../../../utils/constants";

const MemoizedAnnotation = ({
                              annotation,
                              annotationEvents,
                              selectionsIds
                            }) => {
  const AnnotationComponent = ANNOTATION_NAMES_TO_COMPONENT[annotation.name];
  const { tabId } = useStore();

  return (
    <AnnotationComponent
      key={annotation.id}
      annotationEvents={annotationEvents}
      draggable={
        selectionsIds.includes(annotation.id)
        && tabId !== TABS_IDS.FILTERS
        && tabId !== TABS_IDS.FINETUNE
        && tabId !== TABS_IDS.WATERMARK
      }
      {...annotation}
    />
  );
};

MemoizedAnnotation.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  selectionsIds: PropTypes.instanceOf(Object).isRequired
};

export default memo(MemoizedAnnotation);
