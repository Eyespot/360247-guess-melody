import {createTemplateElement} from "../basis/utils";

export default class GameView {
  constructor() {
    if (new.target === GameView) {
      throw new Error(`Can't get any template`);
    }
  }

  get template() {
    return ``;
  }

  render() {
    return createTemplateElement(this.template);
  }

  bind() {
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }
}
