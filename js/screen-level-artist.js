import getTemplateElement from "./stencil.js";
import {getGameRestartButton, onGameRestartButtonClick} from "./game-restart.js";
import showScreen from "./show-screen.js";
import screenLevelGenre from "./screen-level-genre.js";

const segment = `<section class="main main--level main--level-artist">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Пелагея" width="134" height="134">
            Пелагея
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-2" name="answer" value="val-2"/>
          <label class="main-answer" for="answer-2">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Краснознаменная дивизия имени моей бабушки" width="134" height="134">
            Краснознаменная дивизия имени моей бабушки
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-3" name="answer" value="val-3"/>
          <label class="main-answer" for="answer-3">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Lorde" width="134" height="134">
            Lorde
          </label>
        </div>
      </form>
    </div>
  </section>`;

const screenLevelArtist = getTemplateElement(segment);
const gameRestartButton = getGameRestartButton(screenLevelArtist);
gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);

const answerTriggers = screenLevelArtist.querySelectorAll(`.main-answer`);
const onAnswerTriggerClick = (event) => {
  event.preventDefault();
  showScreen(screenLevelGenre);
};

for (const trigger of answerTriggers) {
  trigger.addEventListener(`click`, onAnswerTriggerClick);
}

export default screenLevelArtist;


