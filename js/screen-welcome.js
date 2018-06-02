import getTemplateElement from "./stencil.js";
import showScreen from "./show-screen.js";
import screenLevelArtist from "./screen-level-artist.js";

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

const screenWelcome = getTemplateElement(segment);
const startButton = screenWelcome.querySelector(`.main-play`);

const onStartButtonClick = (event) => {
  event.preventDefault();
  showScreen(screenLevelArtist);
};

startButton.addEventListener(`click`, onStartButtonClick);

export default screenWelcome;
