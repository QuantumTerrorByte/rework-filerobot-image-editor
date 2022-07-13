export const SET_BACKGROUND_IMG = "SET_BACKGROUND_IMG";

const setBackgroundImgRef = (state, payload) => {
  debugger
  return {
    ...state,
    backgroundRef: payload
  }
};

export default setBackgroundImgRef;