import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import ApplicationView from "../view/application-view";
import gameSettings from "../data/game-settings";
// import {tracks} from "../main";

// const trackes = Array.from(preloadedTrackes);
// console.log(tracks);

export default class ArtistView extends ApplicationView {
  constructor(data, state) {
    super();
    this.gameData = data;
    this.level = state.screen;
    this.source = this.gameData[this.level].source;
  }

  get template() {
    return `
    <section class="main main--level main--level-artist">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>

    <div class="main-wrap">
      <h2 class="title main-title">${this.gameData[this.level].question}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${this.source}" preload="auto"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">

      ${new Array(this.gameData[this.level].options.length).fill().map((item, index) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${this.gameData[this.level].options[index].isCorrect}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="${this.gameData[this.level].options[index].image}" alt="${this.gameData[this.level].options[index].image}" width="134" height="134">${this.gameData[this.level].options[index].artist}</label>
        </div>`).join(``)}
        </form>
      </div>
    </section>
    `;
  }

  onArtistAnswerClick() {
  }

  reflectCorrectAnswerOnDevelopment() {
    if (gameSettings.IS_DEVELOPMENT_MODE) {
      const inputs = Array.from(this.element.querySelectorAll(`.main-answer-r`));
      const labels = this.element.querySelectorAll(`.main-answer`);
      for (const input of inputs) {
        if (input.value === `true`) {
          labels[inputs.indexOf(input)].setAttribute(`style`, `font-weight:900;background-color:lightgreen;border-radius:15px`);
        }
      }
    }
  }

  // audioSwitcher() {
  // }//
  bind() {
    const answersList = this.element.querySelector(`.main-list`);
    answersList.addEventListener(`click`, this.onArtistAnswerClick);

    const gameRestartButton = getGameRestartButton(this.element);
    gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);
  }
}
