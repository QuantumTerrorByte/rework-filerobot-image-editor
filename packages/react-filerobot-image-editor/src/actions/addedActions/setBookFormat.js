export const SET_BOOK_FORMAT = "SET_BOOK_FORMAT";

const setBookFormat = (state, payload) => {
  return { ...state, bookFormat: payload };
};

export default setBookFormat;