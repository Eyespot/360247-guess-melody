import GameSetting from "../data/game-setting";
import ClockView from "../view/dinamic-views/components/clock-view";
import Application from "../basis/application";

const PLAYING_BUTTON_SELECTOR = `player-control--pause`;

let currentScreen = document.querySelector(`section.main`);

export default class ApplicationPresenter {
  constructor(model) {
    this.model = model;
  }

  startTimer() {
    this.renderClock();
    let timer = this.model.state.timer;
    this._period = setTimeout(() => {
      timer = timer.tick();
      this.model.state.timer = timer;

      if (timer.time <= 0) {
        this.startTimer();
        this.stopGame();
        Application.showTimeout(this.model);
      } else {
        this.startTimer();
      }
    }, 1000);
  }

  startGame() {
    this.timerStartTime = this.model.state.timer.time;
    this.startTimer();
  }

  stopGame() {
    clearTimeout(this._period);
    const timerEndTime = this.model.state.timer.time;
    this.answerTime = this.timerStartTime - timerEndTime;

    if (this.view.playingTrack) {
      this.view.playingTrack.pause();
    }
  }

  showScreen() {
    currentScreen.parentNode.replaceChild(this.root, currentScreen);
    currentScreen = this.root;
  }

  renderClock() {
    const time = this.model.state.timer.time;
    const newClock = new ClockView(time);
    const circle = document.querySelector(`.timer`);
    const value = document.querySelector(`.timer-value`);

    if (circle) {
      circle.parentNode.removeChild(circle);
      value.parentNode.removeChild(value);
    }

    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, newClock.template);
  }

  progressOnAnswer() {
    this.stopGame();

    if (!this.isAnswerCorrect) {
      this.model.loseLife();
    }
    if (this.model.isGameLost) {
      Application.showNoAttempts();
    } else {
      this.model.nextScreen();

      this.model.setAnswer({
        isCorrect: this.isAnswerCorrect,
        isFast: ApplicationPresenter.getAnswerSpeed(this.answerTime)
      });

      if (this.model.isGameFinished) {
        if (this.view.level.gameType === `artist`) {
          this.view.answersList.removeEventListener(`click`, this.view.onAnswer);
        } else {
          this.view.genreFormSubmit.disabled = true;
        }
        Application.showWin(this.model);
      }

      if (this.model.canTheGameContinue) {
        Application.chooseGame(this.model);
      }
    }
  }

  onPlayerButtonClick(event) {
    event.preventDefault();
    const target = event.target;
    const track = target.previousElementSibling;

    if (target.classList.contains(PLAYING_BUTTON_SELECTOR)) {
      target.classList.remove(PLAYING_BUTTON_SELECTOR);
      track.pause();
      this.playingTrack = null;
      this.playingTrackButton = null;
    } else {
      if (this.playingTrack) {
        this.playingTrackButton.classList.remove(PLAYING_BUTTON_SELECTOR);
        this.playingTrack.pause();
      }

      target.classList.add(PLAYING_BUTTON_SELECTOR);
      this.playingTrack = track;
      this.playingTrackButton = target;

      const playPromise = track.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {

        }).catch(() => {});
      }
    }
  }

  static getAnswerSpeed(answerTime) {
    return (answerTime < GameSetting.FAST_ANSWER);
  }

  static reflectCorrectAnswerOnDevelopment(inputs, labels, key, styles) {
    if (GameSetting.IS_DEVELOPMENT_MODE) {
      const answers = Array.from(inputs);
      for (const input of answers) {
        if (input.value === key) {
          labels[answers.indexOf(input)].setAttribute(`style`, styles);
        }
      }
    }
  }
}
