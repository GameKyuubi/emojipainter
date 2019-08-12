class EmojiCanvas {
  constructor(canvasElement, unitEmojiInt) {
    this.unitEmojiInt = unitEmojiInt;
    this.unitEmojiHTML = this.toHTML(this.unitEmojiInt);
    this.canvasElement = canvasElement;
    this.unitElement = this.createUnitElement(this.unitEmojiInt);
    document.body.appendChild(this.unitElement);
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
  getUnitElement() {
    return this.unitElement;
  }
  getCanvasElement() {
    return this.canvasElement;
  }

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

  createUnitElement(unitEmojiInt) {
    let unitElement = document.createElement('span');
    unitElement.setAttribute('class', 'canvas-unit');
    unitElement.style.display = 'none';
    unitElement.innerHTML = this.toHTML(unitEmojiInt);
    return unitElement;
  }

  unitElementHasSameDimensionsAs(unitEmojiInt) {
    let newElement = this.createUnitElement(unitEmojiInt);
    this.canvasElement.appendChild(newElement);
    newElement.style.display = 'inline-block';
    this.unitElement.style.display = 'inline-block';
    let newBoundingRect = newElement.getBoundingClientRect();
    let unitBoundingRect = this.unitElement.getBoundingClientRect();
    let result = Math.ceil(newBoundingRect.width) == Math.ceil(unitBoundingRect.width)
      && Math.ceil(newBoundingRect.height) == Math.ceil(unitBoundingRect.height);
    newElement.style.display = 'none';
    this.unitElement.style.display = 'none';
    this.canvasElement.removeChild(newElement);
    return result;
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

