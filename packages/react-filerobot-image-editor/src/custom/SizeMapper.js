import getCropBookSize from "./getCropBookSize";
import bookFormats from "./bookFormats/bookFormats";
import finetunesStrsToClasses from "../utils/finetunesStrsToClasses";


//todo /= syntax
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
          annotation.width *= widthPixelToMmRatio;
          annotation.height *= heightPixelToMmRatio;
          break;
        }
        case "Polygon": {
          annotation.radius *= widthPixelToMmRatio;
          break;
        }
        case "Ellipse": {
          annotation.radiusX *= widthPixelToMmRatio;
          annotation.radiusY *= heightPixelToMmRatio;
          break;
        }
        case "Text": {
          annotation.width *= widthPixelToMmRatio;
          annotation.height *= heightPixelToMmRatio;
          annotation.fontSize *= heightPixelToMmRatio;
          break;
        }
        case "Line":
        case "Arrow": {
          annotation.points = annotation.points.map((point, i) => {
            if (i % 2 === 0) {
              return point * widthPixelToMmRatio;
            } else {
              return point * heightPixelToMmRatio;
            }
          });
          break;
        }
        case "Pen": {
          annotation.points = annotation.points.map((point, i) => {
            if (i % 2 === 0) {
              return point * widthPixelToMmRatio + bookSizesPixels.x;
            } else {
              return point * heightPixelToMmRatio + bookSizesPixels.y;
            }
          });
          break;
        }
      }

      //todo extract
      if (Array.isArray(annotation.filters)){
        annotation.filters = finetunesStrsToClasses(annotation.filters);
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
        case "Polygon": { //todo width/height
          annotation.radius = annotation.radius / widthPixelToMmRatio;
          break;
        }
        case "Ellipse": {
          annotation.radiusX = annotation.radiusX / widthPixelToMmRatio * (annotation.scaleX || 1);
          annotation.radiusY = annotation.radiusY / heightPixelToMmRatio * (annotation.scaleY || 1);
          annotation.scaleY = 1;
          annotation.scaleX = 1;
          break;
        }
        case "Text": {
          annotation.width = annotation.width / widthPixelToMmRatio * (annotation.scaleX || 1);
          annotation.height = annotation.height / heightPixelToMmRatio * (annotation.scaleY || 1);
          annotation.scaleY = 1;
          annotation.scaleX = 1;
          annotation.fontSize = annotation.fontSize / heightPixelToMmRatio;
          break;
        }
        case "Line":
        case "Arrow": {
          annotation.points = annotation.points.map((point, i) => {
            if (i % 2 === 0) {
              return point / widthPixelToMmRatio;
            } else {
              return point / heightPixelToMmRatio;
            }
          });
          break;
        }
        case "Pen": {
          annotation.points = annotation.points.map((point, i) => {
            if (i % 2 === 0) {
              return (point - bookSizesPixels.x) / widthPixelToMmRatio;
            } else {
              return (point - bookSizesPixels.y) / heightPixelToMmRatio;
            }
          });
          break;
        }
      }
    }
    return result;
  }
}

export default new SizeMapper();