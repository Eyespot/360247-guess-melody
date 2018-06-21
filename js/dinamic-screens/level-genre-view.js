import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import ApplicationView from "../view/application-view";

export default class GenreView extends ApplicationView {
  constructor(data, state) {
    super();
    this.gameData = data;
    this.level = state.screen;
  }

  get template() {
    return `
  <section class="main main--level main--level-genre">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>

    <div class="main-wrap">
      <h2 class="title">${this.gameData[this.level].question}</h2>
      <form class="genre">
        ${Array(this.gameData[this.level].options.length).fill().map((item, index) => `
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${this.gameData[this.level].options[index].source}" preload="auto"></audio>
                <button class="player-control" data-index="${index + 1}"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="${this.gameData[this.level].options[index].genre}" id="a-${index + 1}">
            <label class="genre-answer-check" for="a-${index + 1}"></label>
          </div>
        `).join(``)}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;
  }

  onGenreAnswerChange() {
  }

  onGenreFormSubmitClick() {
  }

  // audioSwitcher() {
  // }//
  bind() {
    this.genreForm = this.element.querySelector(`.genre`);
    this.genreFormSubmit = this.genreForm.querySelector(`.genre-answer-send`);
    this.genreFormCheckboxes = this.genreForm.querySelectorAll(`input[type=checkbox]`);
    this.gameRestartButton = getGameRestartButton(this.element);
    this.genreForm.addEventListener(`change`, this.onGenreAnswerChange);
    this.genreFormSubmit.addEventListener(`click`, this.onGenreFormSubmitClick);
    this.gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);
  }
}
