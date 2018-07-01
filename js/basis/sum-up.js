import gameSettings from "../data/game-settings";
import reflectResult from "./reflect-game-result";
import {calculateMinutes, getWordDeclension, Numeral} from "./utils";

const CORRECT_ANSWER_POINTS = 1;
const CORRECT_FAST_ANSWER_POINTS = 2;
const MISTAKE_PENALTY = 2;

const getCurrentStatistics = (state) => {
  return {
    pointsReceived: state.outcome.pointsReceived,
    livesLeft: state.lives,
    timeLeft: state.timer.time
  };
};

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
  state.outcome.timeLeft = state.timer.time;
  state.outcome.pointsReceived = points;
  state.outcome.mistakes = gameSettings.ATTEMPTS - state.lives;
  state.timeSpend = calculateMinutes(gameSettings.START_TIME - state.timer.time);

  state.currentStatistics = getCurrentStatistics(state);

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
