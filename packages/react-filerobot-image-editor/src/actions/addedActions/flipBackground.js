export const FLIP_BACKGROUND = "FLIP_BACKGROUND";

const flipBackground = (state) => {
  debugger
  return {
    ...state,
    FlipBackground: !state.FlipBackground
  };
};

export default flipBackground;
