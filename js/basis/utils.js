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
