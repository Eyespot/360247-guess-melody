import initialGameState, {updateScreen, loseLife, setAnswer} from "./game";
import gameSettings from "./game-settings";

export default class ApplicationModel {
  constructor(data) {
    this.data = data;
    this.restart();
  }

  restart() {
    this._state = Object.assign({}, initialGameState);
    this._state.answers = [];
    this._state.gamesStatistics = [];
    this._state.outcome = {
      pointsReceived: 0,
      quickPointsReceived: 0,
      mistakes: 0
    };
  }

  get state() {
    return this._state;
  }

  get type() {
    return this._getLevel(this._state).type;
  }

  get isGameLost() {
    return this._state.lives <= 0;
  }

  get isGameTimeout() {
    return this._state.timer.time <= 0;
  }

  get isGameFinished() {
    return this._state.screen >= gameSettings.LEVELS_QUANTITY;
  }

  get canTheGameContinue() {
    return !this.isGameLost && !this.isGameFinished && !this.isGameTimeout;
  }

  setAnswer(answer) {
    this._state = setAnswer(this._state, answer);
  }

  _getLevel(state) {
    return this.data[state.screen];
  }

  nextScreen() {
    this._state = updateScreen(this._state);
  }

  loseLife() {
    this._state = loseLife(this._state);
  }
}
