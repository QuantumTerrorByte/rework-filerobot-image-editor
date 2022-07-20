export const SET_BACKGROUND_IMG = "SET_BACKGROUND_IMG";

const setBackgroundImgRef = (state, payload) => {

  return {
    ...state,
    backgroundRef: payload
  }
};

export default setBackgroundImgRef;