import gameSettings from "./game-settings";
import {createTimer} from "../basis/timer";

export default Object.freeze({
  lives: gameSettings.ATTEMPTS,
  timer: createTimer(gameSettings.START_TIME),
  screen: gameSettings.START_SCREEN
});

export const updateScreen = (game) => {
  const screen = game.screen++;
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
