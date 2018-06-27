import initialGameState, {updateScreen, loseLife, setAnswer} from "./game";
import gameData from "./game-data";
import gameSettings from "./game-settings";

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

  get getCurrentLevel() {
    return getLevel(this._state);
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

  get gameScore() {
    let points = 0;
    this._state.answers.forEach((answer) => {
      if (answer.isCorrect) {
        points += answer.isFast ? gameSettings.CORRECT_FAST_ANSWER_POINTS : gameSettings.CORRECT_ANSWER_POINTS;
        if (answer.isFast) {
          this._state.outcome.quickPointsReceived++;
        }
      } else {
        points -= gameSettings.MISTAKE_PENALTY;
      }
    });

    return points;
  }

  get getCurrentStatistics() {
    return {
      pointsReceived: this.gameScore,
      livesLeft: this._state.lives,
      timeLeft: this._state.timer.time
    };
  }

  tick() {
    this._state.timer = this._state.timer.tick();
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
