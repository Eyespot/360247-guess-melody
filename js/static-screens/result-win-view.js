import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import ApplicationView from "../view/application-view";

export default class ResultWinView extends ApplicationView {

  constructor() {
    super();
    this.comparisonMessage = this.element.querySelector(`.main-comparison`);
    this.statisticsMessage = this.element.querySelector(`.main-stat`);
  }

  get template() {
    return `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat"></div>
    <span class="main-comparison"></span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
  }

  bind() {
    this.gameRestartButton = getGameRestartButton(this.element);
    this.gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);
  }
}
