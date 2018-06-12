import getTemplateElement from "../basis/stencil";
import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";

const segment = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const screenResultTimeout = getTemplateElement(segment);

const gameRestartButton = getGameRestartButton(screenResultTimeout);
gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);

export default screenResultTimeout;