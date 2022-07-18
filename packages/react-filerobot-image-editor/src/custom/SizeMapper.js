import getCropBookSize from "./getCropBookSize";
import bookFormats from "./bookFormats/bookFormats";

export class SizeMapper {
  convertMmToPixelsAndAddMargins({ elements, canvasWidth, canvasHeight, bookFormat }) {
    const bookSizesPixels = getCropBookSize({ canvasWidth, canvasHeight, bookFormat });
    const bookFormatData = bookFormats[bookFormat];
    const widthPixelToMmRatio = bookSizesPixels.width / bookFormatData.width;
    const heightPixelToMmRatio = bookSizesPixels.height / bookFormatData.height;
    for (const [key, value] of Object.entries(elements)) {
      const annotation = elements[key];
      annotation.x = annotation.x * widthPixelToMmRatio + bookSizesPixels.x;
      annotation.y = annotation.y * heightPixelToMmRatio + bookSizesPixels.y;
      switch (annotation.name) {
        case "Rect": {
          debugger
          annotation.width = annotation.width * widthPixelToMmRatio;
          annotation.height = annotation.height * heightPixelToMmRatio;
          break;
        }
        case "Polygon": {
          annotation.radius = annotation.radius * widthPixelToMmRatio;
          break;
        }
        case "Ellipse": {
          annotation.radiusX = annotation.radiusX * widthPixelToMmRatio;
          annotation.radiusY = annotation.radiusY * heightPixelToMmRatio;
          break;
        }
        case "Text": {
          annotation.width = annotation.width * widthPixelToMmRatio;
          annotation.height = annotation.height * heightPixelToMmRatio;
          annotation.fontSize = annotation.fontSize + heightPixelToMmRatio;
          break;
        }
      }
    }
    return { ...elements };
  }

  convertPixelsToMmAndRemoveMargins({ elements, canvasWidth, canvasHeight, bookFormat }) {
    const bookSizesPixels = getCropBookSize({ canvasWidth, canvasHeight, bookFormat });
    const bookFormatData = bookFormats[bookFormat];
    const widthPixelToMmRatio = bookSizesPixels.width / bookFormatData.width;
    const heightPixelToMmRatio = bookSizesPixels.height / bookFormatData.height;
    for (const [key, value] of Object.entries(elements)) {
      const annotation = elements[key];
      if (annotation.name === "Rect") {
        debugger
        annotation.width = annotation.width / (widthPixelToMmRatio || 1);
        annotation.height = annotation.height / (heightPixelToMmRatio || 1);
        annotation.x = annotation.x / (widthPixelToMmRatio || 1) + bookSizesPixels.x;
        annotation.y = annotation.y / (heightPixelToMmRatio || 1) + bookSizesPixels.y;
      }
    }
    return { ...elements };
  }
}

export default new SizeMapper();