import getTemplateElement from "../basis/stencil";
import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import gameData from "../data/game-data";
import getClockFace from "./components/clock-face";
import getMistakes from "./components/mistakes";
import {getRandomInteger} from "../basis/utils";
import showScreen from "../basis/show-screen";
import changeLevel from "../basis/change-screen";
import initializeAudio from "../dinamic-screens/components/audio";

const getSegment = (state) => `<section class="main main--level main--level-genre">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    
    ${getClockFace(state)}
    
    ${getMistakes(state)}

    <div class="main-wrap">
      <h2 class="title">${gameData[state.screen].question}</h2>
      <form class="genre">
        ${Array(gameData[state.screen].options.length).fill().map((item, index) => `
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${gameData[state.screen].options[index].source}" preload="auto"></audio>
                <button class="player-control" data-index="${index + 1}"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="${gameData[state.screen].options[index].genre}" id="a-${index + 1}">
            <label class="genre-answer-check" for="a-${index + 1}"></label>
          </div>
        `).join(``)}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;

const showGenreLevel = (state) => {
  const level = getTemplateElement(getSegment(state));
  showScreen(level);

  const genreForm = level.querySelector(`.genre`);
  const genreFormCheckboxes = genreForm.querySelectorAll(`input[type=checkbox]`);
  const genreFormSubmit = genreForm.querySelector(`.genre-answer-send`);
  const checkedAnswers = new Set();
  const onGenreAnswerChange = () => {
    checkedAnswers.clear();
    for (const checkbox of genreFormCheckboxes) {
      if (checkbox.checked) {
        checkedAnswers.add(checkbox.value);
      }
    }
    genreFormSubmit.disabled = (!checkedAnswers.size > 0);
  };
  genreForm.addEventListener(`change`, onGenreAnswerChange);

  const resetGenreForm = () => {
    genreForm.reset();
    genreFormSubmit.disabled = true;
  };

  const gameRestartButton = getGameRestartButton(level);
  gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);
  gameRestartButton.addEventListener(`click`, () => {
    resetGenreForm();
  });

  genreFormSubmit.addEventListener(`click`, (event) => {
    event.preventDefault();
    const isCorrect = checkedAnswers.size === 1 && checkedAnswers.has(gameData[state.screen].correctAnswer);
    if (!isCorrect) {
      state.answers.push({
        isCorrect: false,
        isFast: false
      });
      state.lives -= 1;
    } else {
      state.answers.push({
        isCorrect: true,
        isFast: (getRandomInteger(0, 1) > 0)
      });
    }
    state.screen += 1;

    changeLevel(gameData, state);
  });

  initializeAudio(level, gameData, state);
};

export default showGenreLevel;
