import PreloadView from "../view/static-views/preload-view";
import ApplicationPresenter from "./application-presenter";

export default class PreloadPresenter extends ApplicationPresenter {
  constructor() {
    super();

    this.view = new PreloadView(this.model);
    this.root = this.view.element.firstElementChild;
  }

  get element() {
    return this.root;
  }
}
