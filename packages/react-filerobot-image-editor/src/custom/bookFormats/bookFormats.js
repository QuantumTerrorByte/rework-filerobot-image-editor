import { BookFormat } from "./BookFormat";

export const DIGEST = "DIGEST";
export const DIGEST_MINI = "DIGEST_MINI";
export const LETTER = "LETTER";
export const POCKET = "POCKET";
export const US_TRADE = "US_TRADE";

const bookFormats = { //in inches
  [DIGEST]: new BookFormat(8.5, 5.5),
  [DIGEST_MINI]: new BookFormat(8, 5),
  [LETTER]: new BookFormat(7.48, 4.72),
  [POCKET]: new BookFormat(6.75, 4.12),
  [US_TRADE]: new BookFormat(9, 6)
};
export default bookFormats;