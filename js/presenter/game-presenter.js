import gameSettings from "../data/game-settings";
import ClockView from "../view/dinamic-views/components/clock-view";

let currentScreen = document.querySelector(`section.main`);

export default class GamePresenter {
  constructor(model) {
    this.model = model;
    this.time = null;
  }

  startTimer(timer) {
    this.time = setTimeout(() => {
      this.model.state.timer = timer;
      this.updateClock();
      timer = timer.tick();
      this.startTimer(timer);
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this.time);
  }

  startGame() {
    this.startTimer(this.model.state.timer);
  }

  stopGame() {
    this.stopTimer();
  }

  restartGame() {
    this.model.restart();
    // Application.chooseScreen(this.model);
  }

  showScreen() {
    currentScreen.parentNode.replaceChild(this.root, currentScreen);
    currentScreen = this.root;
  }

  getAnswerSpeed(answerTime) {
    return (answerTime < gameSettings.FAST_ANSWER);
  }

  updateClock() {
    const newClock = new ClockView(this.model.state.timer.time);
    const circle = document.querySelector(`.timer`);
    const value = document.querySelector(`.timer-value`);

    circle.parentNode.removeChild(circle);
    value.parentNode.removeChild(value);
    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, newClock.template);
  }
}
