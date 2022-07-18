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
import { DIGEST, DIGEST_MINI, LETTER, POCKET, US_TRADE } from "../../../custom/bookFormats/bookFormats";
import { SET_BOOK_FORMAT } from "../../../actions";

const Crop = ({ selectTool, isSelected }) => {
  const dispatch = useStore().dispatch;
  const { config, t } = useStore();

  const setBookFormat = (format) => {

    dispatch({
      type: SET_BOOK_FORMAT,
      payload: format
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
               setBookFormat(DIGEST);
             }}
        />
        <img src={digestMini} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setBookFormat(DIGEST_MINI);
             }}
        />
        <img src={letter} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setBookFormat(LETTER);
             }}
        />
        <img src={pocket} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setBookFormat(POCKET);
             }}
        />
        <img src={uSTrade} alt=""
             className={"crop-panel_ratio-button"}
             onClick={() => {
               setBookFormat(US_TRADE);
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