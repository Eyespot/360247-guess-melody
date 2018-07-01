import PreloadView from "../view/static-views/preload-view";
import GamePresenter from "../presenter/game-presenter";

export default class PreloadPresenter extends GamePresenter {
  constructor() {
    super();

    this.view = new PreloadView(this.model);
    this.root = this.view.element.firstElementChild;
  }

  get element() {
    return this.root;
  }
}
