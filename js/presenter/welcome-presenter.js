import WelcomeView from "../view/static-views/welcomeView";
import AbstractPresenter from "../presenter/game-presenter";
import Application from "../basis/application";

export default class WelcomePresenter extends AbstractPresenter {
  constructor(model) {
    super();

    this.model = model;
    this.view = new WelcomeView(this.model);
    this.view.onStartButtonClick = this.onStartButtonClick;
    this.view.startTimer = this.startTimer;
    this.root = this.view.element.firstElementChild;
  }

  get element() {
    return this.root;
  }

  onStartButtonClick() {
    Application.chooseGame(this.model);
  }
}
