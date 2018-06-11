import getTemplateElement from "../basis/stencil";
import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import showScreen from "../basis/show-screen";
import screenLevelGenre from "./screen-level-genre";
import gameData from "../data/game-data";
import playerState from "../data/player-state";
import getClockFace from "./components/clock-face";
import getMistakes from "./components/mistakes";

const segment =
  `<section class="main main--level main--level-artist">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    
    ${getClockFace(playerState)}
    
    ${getMistakes(playerState)}
    
    <div class="main-wrap">
      <h2 class="title main-title">${gameData[playerState.screen].question}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio>${gameData[playerState.screen].source}</audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
      
      ${new Array(gameData[playerState.screen].options.length).fill().map((item, index) => (`
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${index + 1}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="${gameData[playerState.screen].options[index].image}" alt="${gameData[playerState.screen].options[index].image}" width="134" height="134">${gameData[playerState.screen].options[index].artist}</label>
        </div>
      `)).join(``)}
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
