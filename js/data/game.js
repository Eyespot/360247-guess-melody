import GameSetting from "./game-setting";
import {createTimer} from "../basis/timer";

export default Object.freeze({
  lives: GameSetting.ATTEMPTS,
  timer: createTimer(GameSetting.START_TIME),
  screen: GameSetting.START_SCREEN
});

export const updateScreen = (game) => {
  const screen = game.screen + 1;
  return Object.assign({}, game, {
    screen
  });
};

export const loseLife = (game) => {
  const lives = game.lives - 1;
  return Object.assign({}, game, {
    lives
  });
};

export const setAnswer = (game, answer) => {
  const answers = [...game.answers];
  answers.push(answer);
  return Object.assign({}, game, {
    answers
  });
};
