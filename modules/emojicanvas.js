class EmojiCanvas {
  constructor(canvasElement, unitEmojiInt) {
    this.unitEmojiInt = unitEmojiInt;
    this.unitEmojiHTML = this.toHTML(this.unitEmojiInt);
    this.canvasElement = canvasElement;
    this.matrix = [[this.unitEmojiHTML]];
    this.updateCanvasElement();
    let _canvasElement = this.canvasElement;
    let xRatio = Math.floor(_canvasElement.parentElement.clientWidth / _canvasElement.getBoundingClientRect().width);
    let yRatio = Math.floor((_canvasElement.parentElement.clientHeight - _canvasElement.getBoundingClientRect().top) / _canvasElement.getBoundingClientRect().height);

    let y = [];
    this.matrix = [];
    for (let i=0; i<yRatio; i++) {
      y.push(this.unitEmojiHTML);
    }
    for (let i=0; i<xRatio; i++) {
      this.matrix.push(y.slice());
    }
    this.updateCanvasElement();
  }

  get width() {
    return this.matrix.length;
  }
  get height() {
    return this.matrix[0].length;
  }
  getCanvasElement() {
    return this.canvasElement;
  }

  /**
   * @param {string, int, int} Hex code of emoji,
   * x-y coordinates
   */
  setPixel(hexEmoji, x, y) {
    this.matrix[x][y] = hexEmoji;
    this.updateCanvasElement();
  }

  toInt(HTMLEmoji) {
    return HTMLEmoji.slice(2, 7);
  }
  toHTML(intEmoji) {
    return '&#' + intEmoji.toString();
  }

  updateCanvasElement() {
    let outputString = '';
    for (let i=0; i<this.height; i++) {
      for (let j=0; j<this.width; j++) {
        outputString += this.matrix[j][i];
      }
      outputString += '<br/>'
    }
    this.canvasElement.innerHTML = outputString;
  }
}

