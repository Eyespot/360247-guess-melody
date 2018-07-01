import ResultTimeoutView from "../view/static-views/result-timeout-view";
import ApplicationPresenter from "./application-presenter";

export default class ResultTimeoutPresenter extends ApplicationPresenter {
  constructor() {
    super();
    this.view = new ResultTimeoutView();
    this.root = this.view.element.firstElementChild;
  }
}
