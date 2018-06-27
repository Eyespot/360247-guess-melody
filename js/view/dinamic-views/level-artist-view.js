import {getGameRestartButton} from "../../basis/game-restart";
import Application from "../../basis/application";
import ApplicationView from "../game-view";

export default class ArtistLevelView extends ApplicationView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
    <section class="main main--level main--level-artist">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>

    <div class="main-wrap">
      <h2 class="title main-title">${this.level.question}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${this.level.source}" preload="auto"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">

      ${new Array(this.level.options.length).fill().map((item, index) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${this.level.options[index].isCorrect}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="${this.level.options[index].image}" alt="${this.level.options[index].image}" width="134" height="134">${this.level.options[index].artist}</label>
        </div>`).join(``)}
        </form>
      </div>
    </section>
    `;
  }

  onPlayerButtonClick() {
  }

  stopGame() {
  }

  catchAnswerTargetValue() {
  }

  onAnswer() {
  }

  bind() {
    const answersList = this.element.querySelector(`.main-list`);
    answersList.addEventListener(`click`, (event) => {
      event.preventDefault();
      const answer = this.catchAnswerTargetValue(event);
      this.onAnswer(answer);
    });

    const gameRestartButton = getGameRestartButton(this.element);
    gameRestartButton.onclick = (event) => {
      event.preventDefault();
      this.stopGame();
      Application.showWelcome();
    };

    // this.players = this.element.querySelectorAll(`.player`);
    // this.tracks = [];
    // this.playerButtons = [];
    // this.players.forEach((item) => {
    //   this.tracks.push(item.querySelector(`audio`));
    //   const button = item.querySelector(`button`);
    //   this.playerButtons.push(button);
    //   button.addEventListener(`click`, this.onPlayerButtonClick);
    // });
    // this.firstTrack = this.tracks[0];
    // this.firstPlayButton = this.playerButtons[0];
  }
}