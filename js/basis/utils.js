import gameSettings from "../data/game-settings";

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

export const createTemplateElement = (segment = ``) => {
  const template = document.createElement(`template`);
  template.innerHTML = segment.trim();
  return template.content;
};

const applicationContainer = document.querySelector(`.app`);
const getComponentDestination = () => {
  return applicationContainer.firstElementChild.firstElementChild;
};

export const appendComponent = (component) => {
  getComponentDestination().insertAdjacentHTML(`afterEnd`, component);
};

export const reflectCorrectAnswerOnDevelopment = (inputs, labels, key, styles) => {
  if (gameSettings.IS_DEVELOPMENT_MODE) {
    const answers = Array.from(inputs);
    for (const input of answers) {
      if (input.value === key) {
        labels[answers.indexOf(input)].setAttribute(`style`, styles);
      }
    }
  }
};
