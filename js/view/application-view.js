import {createTemplateElement} from "../basis/utils";

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
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
    // bind listeners if required
  }

  get element() {
    if (this._element) {
      return this._element.firstElementChild;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element.firstElementChild;
  }
}
