import gameSettings from "../data/game-settings";

const SECONDS_IN_ONE_MINUTE = 60;
const MILLISEDONDS_IN_ONE_SECOND = 1000;

export const getRandomInteger = (min, max) => {
  let random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
};

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

const applicationContainer = document.querySelector(`.app`);
export const getComponentDestination = () => {
  return applicationContainer.firstElementChild.firstElementChild;
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

let time;

export const startTimer = (timer) => {
  time = setTimeout(() => {
    timer = timer.tick();
    startTimer(timer);
    // console.log(timer.time);
  }, MILLISEDONDS_IN_ONE_SECOND);
};

export const stopTimer = () => {
  clearTimeout(time);
};

export const updateClock = () => {

};
