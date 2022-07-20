export const SET_CROP_RATIO = "SET_CROP_RATIO";

const setCropRatio = (state, payload) => {
  return {
    ...state,
    cropRatio: payload
  }
};

export default setCropRatio;