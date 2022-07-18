import bookFormats from "./bookFormats/bookFormats";

const getCropBookSize = ({ canvasWidth, canvasHeight, bookFormat }) => {
  const cropHeight = canvasHeight * 0.75;
  const cropWidth = cropHeight / bookFormats[bookFormat].getRatio();

  return {
    x: (canvasWidth - cropWidth) / 2,
    y: (canvasHeight - cropHeight) / 2,
    width: cropWidth,
    height: cropHeight
  };
};

export default getCropBookSize;