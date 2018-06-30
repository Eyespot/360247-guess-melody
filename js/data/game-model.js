import initialGameState, {updateScreen, loseLife, setAnswer} from "./game";
import gameSettings from "./game-settings";

// const getLevel = (state) => gameData[state.screen];

export default class GameModel {
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

  getLevel(state) {
    return this.data[state.screen];
  }

  get state() {
    return this._state;
  }

  get gameType() {
    return this.getLevel(this._state).gameType;
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

  nextScreen() {
    this._state = updateScreen(this._state);
  }

  loseLife() {
    this._state = loseLife(this._state);
  }

  setAnswer(answer) {
    this._state = setAnswer(this._state, answer);
  }
}
