import getTemplateElement from "../basis/stencil";
import {getGameRestartButton, onGameRestartButtonClick} from "../basis/game-restart";
import summarizePoints from "../basis/summarize-points";
import getCurrentStatistics from "../data/statistics";
import {statistics} from "../data/statistics";
import reflectResult from "../basis/reflect-game-result";
import {calculateMinutes, getRandomInteger, getWordDeclension} from "../basis/utils";
import gameSettings from "../data/game-settings";
import numerals from "../data/numerals";

const getSegment = () => `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали 12 баллов (8 быстрых)
      <br>совершив 3 ошибки</div>
    <span class="main-comparison"></span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

const screenResultWin = getTemplateElement(getSegment());

const gameRestartButton = getGameRestartButton(screenResultWin);
gameRestartButton.addEventListener(`click`, onGameRestartButtonClick);

export default screenResultWin;
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
