import getTemplateElement from "../basis/stencil";
import {getRandomInteger} from "../basis/utils";
import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import showScreen from "../basis/show-screen";
import gameData from "../data/game-data";
import playerState from "../data/player-state";
import getClockFace from "./components/clock-face";
import getMistakes from "./components/mistakes";
import changeLevel from "../basis/change-screen";

export const getSegment = (state) =>
  `<section class="main main--level main--level-artist">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    
    ${getClockFace(state)}
    
    ${getMistakes(state)}
    
    <div class="main-wrap">
      <h2 class="title main-title">${gameData[state.screen].question}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio>${gameData[state.screen].source}</audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
      
      ${new Array(gameData[state.screen].options.length).fill().map((item, index) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${gameData[state.screen].options[index].isCorrect}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="${gameData[state.screen].options[index].image}" alt="${gameData[state.screen].options[index].image}" width="134" height="134">${gameData[state.screen].options[index].artist}</label>
        </div>
      `).join(``)}
      </form>
    </div>
  </section>`;

const showArtistLevel = (state) => {
  const level = getTemplateElement(getSegment(state));
  showScreen(level);

  const gameRestartButton = getGameRestartButton(level);
  gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);

  const answerTriggers = level.querySelectorAll(`.main-answer`);
  for (const trigger of answerTriggers) {
    trigger.addEventListener(`click`, (event) => {
      const isCorrect = JSON.parse(event.target.parentNode.parentNode.children[0].value);
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

      changeLevel(gameData, playerState);
    });
  }

  // audioSwitcher();
};

export default showArtistLevel;
