import {getGameRestartButton} from "../../basis/game-restart";
import ApplicationView from "../game-view";
import Application from "../../basis/application";

export default class ResultTimeoutView extends ApplicationView {

  constructor() {
    super();
  }

  get template() {
    return `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;
  }

  bind() {
    const gameRestartButton = getGameRestartButton(this.element);
    gameRestartButton.onclick = (event) => {
      event.preventDefault();
      Application.replay();
    };
  }
}
