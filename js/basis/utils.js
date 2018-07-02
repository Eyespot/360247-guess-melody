import GameSetting from "../data/game-setting";

const SECONDS_IN_ONE_MINUTE = 60;

export const calculateMinutes = (time) => {
  const minutes = Math.floor(time / SECONDS_IN_ONE_MINUTE);
  const seconds = time % SECONDS_IN_ONE_MINUTE;

  return {minutes, seconds};
};

export const getWordDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export const createTemplateElement = (segment = ``) => {
  const template = document.createElement(`template`);
  template.innerHTML = segment.trim();
  return template.content;
};

export const Numeral = Object.freeze(
    {
      MINUTES: [`минуту`, `минуты`, `минут`],
      SECONDS: [`секунду`, `секунды`, `секунд`],
      POINTS: [`балл`, `балла`, `баллов`],
      SHORTS: [`быстрый`, `быстрых`, `быстрых`],
      MISTAKES: [`ошибку`, `ошибки`, `ошибок`]
    }
);

export const getCurrentStatistics = (state) => {
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
      points += answer.isFast ? GameSetting.CORRECT_FAST_ANSWER_POINTS : GameSetting.CORRECT_ANSWER_POINTS;
      if (answer.isFast) {
        state.outcome.quickPointsReceived++;
      }
    } else {
      points -= GameSetting.MISTAKE_PENALTY;
    }
  }

  return points;
};
