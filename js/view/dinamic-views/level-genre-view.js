import ApplicationView from "../game-view";
import Application from "../../basis/application";

export default class GenreView extends ApplicationView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
  <section class="main main--level main--level-genre">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>

    <div class="main-wrap">
      <h2 class="title">${this.level.question}</h2>
      <form class="genre">
        ${Array(this.level.options.length).fill().map((item, index) => `
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${this.level.options[index].source}" preload="auto"></audio>
                <button class="player-control" data-index="${index + 1}"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="${this.level.options[index].genre}" id="a-${index + 1}">
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

  onPlayerButtonClick() {
  }

  bind() {
    const gameRestartButton = this.element.querySelector(`.play-again`);
    gameRestartButton.addEventListener(`click`, (event) => {
      event.stopPropagation();
      event.preventDefault();
      Application.showModal(this.stopGame);
    });

    this.genreForm = this.element.querySelector(`.genre`);
    this.genreForm.addEventListener(`change`, () => {
      this.onGenreAnswerChange();
    });

    this.genreFormSubmit = this.genreForm.querySelector(`.genre-answer-send`);
    this.genreFormSubmit.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onGenreFormSubmitClick();
    });

    this.players = this.element.querySelectorAll(`.player`);
    this.tracks = [];
    this.playerButtons = [];
    this.players.forEach((item) => {
      this.tracks.push(item.querySelector(`audio`));
      const button = item.querySelector(`button`);
      this.playerButtons.push(button);
      button.addEventListener(`click`, (event) => {
        this.onPlayerButtonClick(event);
      });
    });
    this.playingTrack = this.tracks[0];
    this.playingTrackButton = this.playerButtons[0];
    this.playingTrack.oncanplay = () => {
      if (this.playingTrack) {
        this.playingTrack.play().catch(() => {
          Application.showError(`Произошел сбой обработки аудио`);
        });
      }
    };
    this.playingTrackButton.classList.add(`player-control--pause`);
  }
}
