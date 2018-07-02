import ResultNoAttemptsView from "../view/static-views/result-no-attempts-view";
import ApplicationPresenter from "./application-presenter";

export default class ResultNoAttemptsPresenter extends ApplicationPresenter {
  constructor() {
    super();
    this.view = new ResultNoAttemptsView();
    this.root = this.view.element.firstElementChild;
  }
}
