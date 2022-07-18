export class BookFormat {
  width;
  height;

  constructor(height, width) {
    this.width = width;
    this.height = height;
  }

  getRatio() {
    return this.height / this.width;
  }
}