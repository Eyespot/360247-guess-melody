import initialState from "./initial-game-state";
import gameSettings from "./game-settings";

export default {
  lives: initialState.lives,
  time: initialState.time,
  screen: initialState.screen,
  answers: [],
  statistics: [],
  reset() {
    this.lives = gameSettings.ATTEMPTS;
    this.time = gameSettings.START_TIME;
    this.screen = initialState.screen;
    this.answers = [];
    this.statistics = [];
  }
};
