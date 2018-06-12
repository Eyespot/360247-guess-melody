import getTemplateElement from "../basis/stencil";
import showScreen from "../basis/show-screen";
import playerState from "../data/player-state";
import changeLevel from "../basis/level-switcher";
import gameData from "../data/game-data";

const segment = `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

export const screenWelcome = getTemplateElement(segment);

export default () => {
  showScreen(screenWelcome);
  const startButton = screenWelcome.querySelector(`.main-play`);
  startButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    changeLevel(gameData, playerState);
  });
};
