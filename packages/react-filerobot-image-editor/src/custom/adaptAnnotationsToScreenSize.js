//MAP STATE FOR ADAPT
const adaptAnnotationsToScreenSize = (annotations) => {
  const isMobile = window.innerWidth < 420;
  const resizeCoefficient = 1;
  if (isMobile && annotations) {
    for (const [key, value] of Object.entries(annotations)) {
      annotations[key] = {
        ...value,
        x: value.x * 0.7,
        width: value.width ? value.width * resizeCoefficient : undefined,
        height: value.height ? value.height * resizeCoefficient : undefined
      };
    }
  }
  return annotations;
};
export default adaptAnnotationsToScreenSize;