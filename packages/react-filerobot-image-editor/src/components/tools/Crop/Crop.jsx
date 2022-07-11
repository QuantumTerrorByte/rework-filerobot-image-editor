/** External Dependencies */
import React, { useState } from "react";
import PropTypes from "prop-types";

/** Internal Dependencies */
import { useStore } from "hooks";
import RotateOptions from "../Rotate/RotateOptions";
import { FLIP_BACKGROUND } from "../../../actions/addedActions/flipBackground";
import digest from "./imgs/Digest 5.5x8.5.png";
import digestMini from "./imgs/Digest mini 5x8.png";
import letter from "./imgs/Letter 4.72x7.48.png";
import pocket from "./imgs/Pocket 4.12x6.75.png";
import uSTrade from "./imgs/US trade 6x9.png";
import { SET_CROP_RATIO } from "../../../actions/addedActions/setCropRatio";

const Crop = ({ selectTool, isSelected }) => {
  const dispatch = useStore().dispatch;
  const { config, t } = useStore();

  const setRatio = (ratio) => {
    dispatch({
      type: SET_CROP_RATIO,
      payload: ratio
    });
  };


  return (
    <div className={"crop-panel_container"}>
      <div className={"crop-panel_rotate-flip-container"}>
        <RotateOptions />
        <div className={"flip-button"} onClick={() => {
          debugger
          dispatch({
            type: FLIP_BACKGROUND
          });
        }}>Flip
        </div>
      </div>
      <div className={"crop-panel_ratios-container"}>
        <img src={digest} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setRatio(8.5 / 5.5);
             }}
        />
        <img src={digestMini} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setRatio(8 / 5);
             }}
        />
        <img src={letter} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setRatio(7.48 / 4.72);
             }}
        />
        <img src={pocket} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setRatio(6.75 / 4.12);
             }}
        />
        <img src={uSTrade} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setRatio(9 / 6);
             }}
        />
      </div>
    </div>
  );
};

Crop.defaultProps = {
  isSelected: false
};

Crop.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
};

export default Crop;