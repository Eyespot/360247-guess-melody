const SECONDS_IN_MINUTE = 60;

export const getRandomInteger = (min, max) => {
  let random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
};

export const calculateMinutes = (time) => {
  const minutes = Math.floor(time / SECONDS_IN_MINUTE);
  const seconds = time % SECONDS_IN_MINUTE;

  return {minutes, seconds};
};

export const getWordDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};
