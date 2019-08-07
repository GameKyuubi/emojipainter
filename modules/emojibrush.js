class EmojiBrush {
  constructor(brushInt) {
    this._brushInt = brushInt;
  }

  get brushInt() {
    return this._brushInt;
  }
  get html() {
    return '&#' + this.brushInt;
  }
  set brushInt(brushInt) {
    this._brushInt = brushInt;
  }
}
