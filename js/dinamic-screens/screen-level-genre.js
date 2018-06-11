import getTemplateElement from "../basis/stencil";
import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
// import {getRandomInteger} from "../basis/utils";
// import showScreen from "../basis/show-screen";
// import screenResultNoAttempts from "../static-screens/screen-result-no-attempts";
// import screenResultTimeout from "../static-screens/screen-result-timeout";
// import screenResultWin from "../static-screens/screen-result-win";
// import playerState from "../data/player-state";
import gameData from "../data/game-data";

// const RESULT_SCREENS = [screenResultNoAttempts, screenResultTimeout, screenResultWin];


const segment = `<section class="main main--level main--level-genre">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>

    <div class="main-wrap">
      <h2 class="title">${gameData[2].question}</h2>
      <form class="genre">
        ${Array(gameData[2].options.length).fill().map((item, index) => (`
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${gameData[2].options[index].source}" preload="auto"></audio>
                <button class="player-control player-control--pause" data-index="${index + 1}"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="${index + 1}" id="a-${index + 1}">
            <label class="genre-answer-check" for="a-${index + 1}"></label>
          </div>
        `)).join(``)};
        <!--<div class="genre-answer">-->
          <!--<div class="player-wrapper">-->
            <!--<div class="player">-->
              <!--<audio></audio>-->
              <!--<button class="player-control player-control&#45;&#45;pause"></button>-->
              <!--<div class="player-track">-->
                <!--<span class="player-status"></span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<input type="checkbox" name="answer" value="answer-1" id="a-1">-->
          <!--<label class="genre-answer-check" for="a-1"></label>-->
        <!--</div>-->

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
  // const nextScreen = RESULT_SCREENS[2];
  // showScreen(nextScreen);
  resetGenreForm();
};

genreFormSubmit.addEventListener(`click`, onFormSubmitClick);

export default screenLevelGenre;
