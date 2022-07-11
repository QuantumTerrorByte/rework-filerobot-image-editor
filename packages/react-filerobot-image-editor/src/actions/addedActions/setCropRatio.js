export const SET_CROP_RATIO = "SET_CROP_RATIO";

const setCropRatio = (state, payload) => {
  debugger
  return {
    ...state,
    cropRatio: payload
  }
};

export default setCropRatio;