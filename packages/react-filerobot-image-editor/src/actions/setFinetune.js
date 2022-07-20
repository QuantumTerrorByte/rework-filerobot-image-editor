export const SET_FINETUNE = "SET_FINETUNE";

const setFinetune = (state, payload) => { //payload { finetune, finetuneProps }
  const { selectionsIds } = state;
  const temp = typeof payload.finetune
  debugger
  if (selectionsIds.length === 1 && payload.finetuneProps) {
    const annotation = { ...state.annotations[selectionsIds[0]], ...payload.finetuneProps };

    if (Array.isArray(annotation.filters)) {
      const finetuneExist = annotation.filters.find((finetune) =>
        finetune?.name === payload.finetune.name
      );
      if (!finetuneExist){
        annotation.filters.push(payload.finetune);
      }
    } else {
      annotation.filters = [payload.finetune];
    }

    debugger

    return { ...state, annotations: { ...state.annotations, [selectionsIds[0]]: annotation } };
  }

  return {
    ...state,
    isDesignState: !payload.dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    finetunes:
      !payload.finetune || state.finetunes.includes(payload.finetune)
        ? state.finetunes
        : [...state.finetunes, payload.finetune],
    finetunesProps: {
      ...state.finetunesProps,
      ...payload.finetuneProps
    }
  };
};

export default setFinetune;
