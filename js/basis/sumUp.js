import gameSettings from "../data/game-settings";
import reflectResult from "./reflect-game-result";
import numerals from "../data/numerals";
import {calculateMinutes, getRandomInteger, getWordDeclension} from "./utils";
import {statistics} from "../data/statistics";
import getCurrentStatistics from "../data/statistics";

const CORRECT_ANSWER_POINTS = 1;
const CORRECT_FAST_ANSWER_POINTS = 2;
const MISTAKE_PENALTY = 2;

export const summarizePoints = (state) => {

  let points = 0;
  for (const answer of state.answers) {
    if (answer.isCorrect) {
      points += answer.isFast ? CORRECT_FAST_ANSWER_POINTS : CORRECT_ANSWER_POINTS;
      if (answer.isFast) {
        state.outcome.quickPointsReceived++;
      }
    } else {
      points -= MISTAKE_PENALTY;
    }
  }

  return points;
};

export const getFinalResult = (state) => {
  const points = summarizePoints(state);
  state.outcome.timeSpend = calculateMinutes(gameSettings.START_TIME - getRandomInteger(25, 250));
  state.outcome.pointsReceived = points;
  state.outcome.mistakes = gameSettings.ATTEMPTS - state.lives;
  const currentStatistics = getCurrentStatistics(state, points);

  return reflectResult(statistics, currentStatistics);
};
export const getStatisticsMessage = (state) => {
  const minutes = state.outcome.timeSpend.minutes;
  const seconds = state.outcome.timeSpend.seconds;
  const points = state.outcome.pointsReceived;
  const quickPoints = state.outcome.quickPointsReceived;
  const mistakes = state.outcome.mistakes;
  const minutesDeclension = getWordDeclension(minutes, numerals.minute);
  const secondsDeclension = getWordDeclension(seconds, numerals.second);
  const pointsDeclension = getWordDeclension(points, numerals.point);
  const quickPointsDeclension = getWordDeclension(quickPoints, numerals.quick);
  const mistakesDeclension = getWordDeclension(mistakes, numerals.mistake);

  return `За ${minutes} ${minutesDeclension} и ${seconds} ${secondsDeclension}<br>вы набрали ${points} ${pointsDeclension} (${quickPoints} ${quickPointsDeclension})<br>совершив ${mistakes} ${mistakesDeclension}`.trim();
};
