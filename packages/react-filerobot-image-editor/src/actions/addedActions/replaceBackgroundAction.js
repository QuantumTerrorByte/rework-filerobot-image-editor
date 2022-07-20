export const MOVE_BACKGROUND = "REPLACE_BACKGROUND";

const replaceBackgroundAction = (state, payload) => {
  return {
    ...state,
    backgroundX: payload.x,
    backgroundY: payload.y,
  };
};
export default replaceBackgroundAction;