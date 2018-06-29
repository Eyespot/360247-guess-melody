import initialGameState, {updateScreen, loseLife, setAnswer} from "./game";
import gameData from "./game-data";

const getLevel = (state) => gameData[state.screen];

export default class GameModel {
  constructor() {
    this.restart();
  }

  restart() {
    this._state = Object.assign({}, initialGameState);
    this._state.answers = [];
    this._state.outcome = {
      timeSpend: {},
      pointsReceived: 0,
      quickPointsReceived: 0,
      mistakes: 0
    };
  }

  get state() {
    return this._state;
  }

  get gameType() {
    return getLevel(this._state).gameType;
  }

  get isGameLost() {
    return this._state.lives <= 0;
  }

  get isGameTimeout() {
    return this._state.timer.time <= 0;
  }

  get isGameFinished() {
    return this._state.screen >= gameData.length;
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
