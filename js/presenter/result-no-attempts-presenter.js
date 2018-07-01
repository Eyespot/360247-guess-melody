import ResultNoAttemptsView from "../view/static-views/result-no-attempts-view";
import GamePresenter from "./game-presenter";

export default class ResultNoAttemptsPresenter extends GamePresenter {
  constructor() {
    super();
    this.view = new ResultNoAttemptsView();
    this.root = this.view.element.firstElementChild;
  }
}
