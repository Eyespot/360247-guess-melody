import gameSettings from "../data/game-settings";
import ClockView from "../view/dinamic-views/components/clock-view";
import Application from "../basis/application";

let currentScreen = document.querySelector(`section.main`);

export default class GamePresenter {
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
        this.startGame(timer);
        this.stopGame();
        Application.showTimeout(this.model);
      } else {
        this.startTimer(timer);
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
  }

  showScreen() {
    currentScreen.parentNode.replaceChild(this.root, currentScreen);
    currentScreen = this.root;
  }

  getAnswerSpeed(answerTime) {
    return (answerTime < gameSettings.FAST_ANSWER);
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

  reflectCorrectAnswerOnDevelopment(inputs, labels, key, styles) {
    if (gameSettings.IS_DEVELOPMENT_MODE) {
      const answers = Array.from(inputs);
      for (const input of answers) {
        if (input.value === key) {
          labels[answers.indexOf(input)].setAttribute(`style`, styles);
        }
      }
    }
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
        isFast: this.getAnswerSpeed(this.answerTime)
      });

      if (this.model.isGameFinished) {
        Application.showWin(this.model);
      }

      if (this.model.canTheGameContinue) {
        Application.chooseGame(this.model);
      }
    }
  }
}
