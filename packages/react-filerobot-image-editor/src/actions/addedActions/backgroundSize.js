export const BACKGROUND_RESIZE = "BACKGROUND_RESIZE";

const backgroundSize = (state, payload) => {
  debugger
  return {
    ...state,
    backgroundWidthAddon: payload.width,
    backgroundHeightAddon: payload.height,
  };
};
export default backgroundSize;