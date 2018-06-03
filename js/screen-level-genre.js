import getTemplateElement from "./stencil";
import {getGameRestartButton, onGameRestartButtonClick} from "./game-restart";
import {getRandomInteger} from "./utils";
import showScreen from "./show-screen";
import screenResultNoAttempts from "./screen-result-no-attempts";
import screenResultTimeout from "./screen-result-timeout";
import screenResultWin from "./screen-result-win";

const RESULT_SCREENS = [screenResultNoAttempts, screenResultTimeout, screenResultWin];

const segment = `<section class="main main--level main--level-genre">
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
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;

const screenLevelGenre = getTemplateElement(segment);
const gameRestartButton = getGameRestartButton(screenLevelGenre);
gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);
gameRestartButton.addEventListener(`click`, () => {
  resetGenreForm();
});

const genreForm = screenLevelGenre.querySelector(`.genre`);
const genreFormCheckboxes = genreForm.querySelectorAll(`input[type=checkbox]`);
const genreFormSubmit = genreForm.querySelector(`.genre-answer-send`);
const onGenreAnswerChange = () => {
  for (const checkbox of genreFormCheckboxes) {
    if (checkbox.checked) {
      genreFormSubmit.disabled = false;

      return;
    }
  }
  genreFormSubmit.disabled = true;
};
genreForm.addEventListener(`change`, onGenreAnswerChange);

const resetGenreForm = () => {
  genreForm.reset();
  genreFormSubmit.disabled = true;
};

const onFormSubmitClick = (event) => {
  event.preventDefault();
  const nextScreen = RESULT_SCREENS[getRandomInteger(0, 2)];
  showScreen(nextScreen);
  resetGenreForm();
};

genreFormSubmit.addEventListener(`click`, onFormSubmitClick);

export default screenLevelGenre;