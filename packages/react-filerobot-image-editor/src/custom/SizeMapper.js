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
      if (annotation.name !== "Pen") {
        annotation.x = annotation.x * widthPixelToMmRatio + bookSizesPixels.x;
        annotation.y = annotation.y * heightPixelToMmRatio + bookSizesPixels.y;
      }
      switch (annotation.name) {
        case "Rect":
        case "Image": {
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
          annotation.fontSize = annotation.fontSize * heightPixelToMmRatio;
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
    const result = JSON.parse(JSON.stringify(elements));

    for (const [key, value] of Object.entries(result)) {
      const annotation = result[key];
      if (annotation.name !== "Pen") {
        annotation.x = (annotation.x - bookSizesPixels.x) / widthPixelToMmRatio;
        annotation.y = (annotation.y - bookSizesPixels.y) / heightPixelToMmRatio;
      }
      switch (annotation.name) {
        case "Rect":
        case "Image": {
          annotation.width = annotation.width / widthPixelToMmRatio * annotation.scaleX;
          annotation.height = annotation.height / heightPixelToMmRatio * annotation.scaleY;
          annotation.scaleY = 1;
          annotation.scaleX = 1;
          break;
        }
        case "Polygon": {
          annotation.radius = annotation.radius / widthPixelToMmRatio;
          break;
        }
        case "Ellipse": {
          annotation.radiusX = annotation.radiusX / widthPixelToMmRatio;
          annotation.radiusY = annotation.radiusY / heightPixelToMmRatio;
          break;
        }
        case "Text": {
          annotation.width = annotation.width / widthPixelToMmRatio;
          annotation.height = annotation.height / heightPixelToMmRatio;
          annotation.fontSize = annotation.fontSize / heightPixelToMmRatio;
          break;
        }
      }
    }
    return result;
  }
}

export default new SizeMapper();