import PreloadView from "../view/static-views/preload-view";
import GamePresenter from "../presenter/game-presenter";
import Application from "../basis/application";

export default class PreloadPresenter extends GamePresenter {
  constructor() {
    super();

    this.view = new PreloadView(this.model);
    this.root = this.view.element.firstElementChild;

    this.view.onWindowLoad = this.onWindowLoad;
  }

  get element() {
    return this.root;
  }

  onWindowLoad() {
    Application.showWelcome();
  }
}
