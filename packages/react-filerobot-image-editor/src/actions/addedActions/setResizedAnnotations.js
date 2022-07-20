export const SET_RESIZED_ANNO = "SET_RESIZED_ANNO";

const setResizedAnnotations = (state, payload) => {
  return {
    ...state,
    annotations: payload
  }
};

export default setResizedAnnotations;