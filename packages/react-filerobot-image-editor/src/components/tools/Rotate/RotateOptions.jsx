/** External Dependencies */
import React from 'react';
import RotationSlider from '@scaleflex/ui/core/rotation-slider';

/** Internal Dependencies */
import { useDebouncedCallback, useStore } from 'hooks';
import { CHANGE_ROTATION, SET_RESIZE } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';

const RotateOptions = () => {
  const {
    dispatch,
    adjustments: { rotation = 0 },
    backgroundRotation,
    resize = {},
  } = useStore();

  const changeRotation = useDebouncedCallback((_e, newRotation) => {
    const rotationAngle = restrictNumber(newRotation, -180, 180);
    dispatch({
      type: CHANGE_ROTATION,
      payload: {
        rotation: rotationAngle,
      },
    });

    if (resize.width && resize.height) {
      const sizeAfterRotation = getSizeAfterRotation(
        resize.width,
        resize.height,
        rotationAngle,
      );
      dispatch({
        type: SET_RESIZE,
        payload: {
          width: sizeAfterRotation.width,
          height: sizeAfterRotation.height,
        },
      });
    }
  }, 20);

  return (
    <RotationSlider
      className="FIE_rotate-slider"
      min={-180}
      max={180}
      value={backgroundRotation}
      angle={60}
      onChange={changeRotation}
      style={{ marginBottom: 20 }}
    />
  );
};

export default RotateOptions;
