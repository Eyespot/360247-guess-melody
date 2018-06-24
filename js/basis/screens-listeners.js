import changeLevel from "../basis/change-screen";
import {getRandomInteger} from "./utils";
import gameSettings from "../data/game-settings";

const getAnswerSpeed = () => {
  return (getRandomInteger(25, 35) < gameSettings.FAST_ANSWER);
};

const onAnswer = (data, state, isCorrect) => {
  state.answers.push({isCorrect, isFast: getAnswerSpeed()});
  if (!isCorrect) {
    state.lives--;
  }

  state.screen++;

  changeLevel(data, state);
};

export const onArtistAnswer = (event, data, state) => {
  const target = event.target;
  const currentLevel = data[state.screen];
  const answersMap = {
    0: currentLevel.options[0].isCorrect,
    1: currentLevel.options[1].isCorrect,
    2: currentLevel.options[2].isCorrect
  };
  const answers = Array.from(event.currentTarget.querySelectorAll(`.main-answer-r`));
  const answerNumber = answers.indexOf(target);
  const isCorrect = answersMap[answerNumber];

  if (target.hasAttribute(`value`)) {
    event.stopPropagation();
    onAnswer(data, state, isCorrect);
  }
};

let checkedAnswers = [];

export const onGenreAnswerChange = (checkboxes, submit) => {
  checkedAnswers = [];
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      checkedAnswers.push(checkbox.value);
    }
  }
  submit.disabled = (!checkedAnswers.length > 0);
};

export const onGenreFormSubmitClick = (data, state) => {
  event.preventDefault();
  const currentLevel = data[state.screen];
  const correctAnswer = currentLevel.correctAnswer;
  let correctAnswersQuantity = 0;
  currentLevel.options.forEach((option) => {
    if (option.genre === correctAnswer) {
      correctAnswersQuantity++;
    }
  });
  const checkValue = (value) => value === correctAnswer;
  const isCorrect = checkedAnswers.every(checkValue) && checkedAnswers.length === correctAnswersQuantity;
  onAnswer(data, state, isCorrect);
};
