import ApplicationView from "../game-view";
import Application from "../../basis/application";

export default class ResultNoAttemptsView extends ApplicationView {

  constructor() {
    super();
  }

  get template() {
    return `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;
  }

  bind() {
    const gameReplayButton = this.element.querySelector(`.main-replay`);
    gameReplayButton.onclick = (event) => {
      event.preventDefault();
      Application.replay();
    };
  }
}
