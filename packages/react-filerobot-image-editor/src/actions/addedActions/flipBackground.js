export const FLIP_BACKGROUND = "FLIP_BACKGROUND";

const flipBackground = (state) => {

  return {
    ...state,
    FlipBackground: !state.FlipBackground
  };
};

export default flipBackground;
