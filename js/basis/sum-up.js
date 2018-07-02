import GameSetting from "../data/game-setting";
import reflectResult from "./reflect-game-result";
import {calculateMinutes, getWordDeclension, Numeral} from "./utils";

export const getFinalResult = (state) => {
  state.outcome.timeLeft = state.timer.time;
  state.outcome.mistakes = GameSetting.ATTEMPTS - state.lives;
  state.timeSpend = calculateMinutes(GameSetting.START_TIME - state.timer.time);

  return reflectResult(state.gamesStatistics, state.currentStatistics);
};

export const getStatisticsMessage = (state) => {
  const minutes = state.timeSpend.minutes;
  const seconds = state.timeSpend.seconds;
  const points = state.outcome.pointsReceived;
  const quickPoints = state.outcome.quickPointsReceived;
  const mistakes = state.outcome.mistakes;
  const minutesDeclension = getWordDeclension(minutes, Numeral.MINUTES);
  const secondsDeclension = getWordDeclension(seconds, Numeral.SECONDS);
  const pointsDeclension = getWordDeclension(points, Numeral.POINTS);
  const quickPointsDeclension = getWordDeclension(quickPoints, Numeral.SHORTS);
  const mistakesDeclension = getWordDeclension(mistakes, Numeral.MISTAKES);

  return `За ${minutes} ${minutesDeclension} и ${seconds} ${secondsDeclension}<br>вы набрали ${points} ${pointsDeclension} (${quickPoints} ${quickPointsDeclension})<br>совершив ${mistakes} ${mistakesDeclension}`.trim();
};
