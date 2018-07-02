import ApplicationPresenter from "./application-presenter";
import ResultWinView from "../view/static-views/result-win-view";
import {getFinalResult, getStatisticsMessage} from "../basis/sum-up";

export default class ResultWinPresenter extends ApplicationPresenter {
  constructor(model) {
    super();
    this.state = model.state;
    this.view = new ResultWinView();
    this.root = this.view.element.firstElementChild;
    this.view.comparisonMessage = this.root.querySelector(`.main-comparison`);
    this.view.statisticsMessage = this.root.querySelector(`.main-stat`);

    this.view.comparisonMessage.textContent = getFinalResult(this.state);
    this.view.statisticsMessage.innerHTML = getStatisticsMessage(this.state);
  }
}
