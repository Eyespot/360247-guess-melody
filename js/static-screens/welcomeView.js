// import getTemplateElement from "../basis/stencil";
// import showScreen from "../basis/show-screen";
// import getPlayerState from "../data/player-state";
// import changeLevel from "../basis/change-screen";
// import gameData from "../data/game-data";
import ApplicationView from "../view/application-view";

export default class WelcomeView extends ApplicationView {

  constructor() {
    super();
  }

  get template() {
    return `
    <section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    </section>
    `;
  }

  onStartButtonClick() {
  }

  bind() {
    this.element.querySelector(`.main-play`).onclick = (event) => {
      event.preventDefault();
      this.onStartButtonClick();
    };
  }
}
