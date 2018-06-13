import {assert} from 'chai';
import {getRandomInteger} from "./utils";
import summarizePoints from "./summarize-points";

const playerAnswerTemplates = {
  incorrectAnswer: {isCorrect: false, isFast: false},
  correctSlowAnswer: {isCorrect: true, isFast: false},
  correctFastAnswer: {isCorrect: true, isFast: true}
};

const generateAnswer = (template) => {
  const answer = Object.assign({}, template);
  if (!getRandomInteger(0, 1)) {

    return answer;
  }
  answer.isCorrect = true;
  let answerTiming = getRandomInteger(0, 75);
  if (answerTiming < 30) {
    answer.isFast = true;
  }

  return answer;
};

const getRandomPlayerAnswers = (length) => {
  const state = {
    answers: [],
    outcome: {
      pointsReceived: 0
    }
  };

  for (let i = 0; i < length; i++) {
    state.answers.push(generateAnswer(playerAnswerTemplates.incorrectAnswer));
  }

  return state;
};

const getSpecifiedPlayerAnswers = (correctSlowQuantity, correctFastQuantity, mistakesQuantity) => {
  const state = {
    answers: [],
    outcome: {
      pointsReceived: 0
    }
  };
  for (let i = 1; i <= correctSlowQuantity; i++) {
    state.answers.push(playerAnswerTemplates.correctSlowAnswer);
  }
  for (let i = 1; i <= correctFastQuantity; i++) {
    state.answers.push(playerAnswerTemplates.correctFastAnswer);
  }
  for (let i = 1; i <= mistakesQuantity; i++) {
    state.answers.push(playerAnswerTemplates.incorrectAnswer);
  }
  return state;
};

describe(`Check statistics`, () => {
  describe(`Check points summarizing`, () => {

    it(`should return 10 points on user 10 correct slow answers`, () => {
      const correctSlowAnswers = getSpecifiedPlayerAnswers(10, 0, 0);
      assert.equal(10, summarizePoints(correctSlowAnswers, 3));
    });

    it(`should return 20 points on user 10 correct fast answers`, () => {
      const correctFastAnswers = getSpecifiedPlayerAnswers(0, 10, 0);
      assert.equal(20, summarizePoints(correctFastAnswers, 3));
    });

    it(`should return 7 points on user 5 correct slow answers, 4 correct fast answers, 2 mistakes`, () => {
      const answers532 = getSpecifiedPlayerAnswers(5, 3, 2);
      assert.equal(7, summarizePoints(answers532, 3));
    });

    it(`should return 14 points on user 2 correct slow answers, 7 correct fast answers, 1 mistake`, () => {
      const answers271 = getSpecifiedPlayerAnswers(2, 7, 1);
      assert.equal(14, summarizePoints(answers271, 3));
    });

    it(`should return 11 points on user 5 correct slow answers, 4 correct fast answers, 1 mistake`, () => {
      const answers541 = getSpecifiedPlayerAnswers(5, 4, 1);
      assert.equal(11, summarizePoints(answers541, 3));
    });

    it(`should return 8 points on user 4 correct slow answers, 4 correct fast answers, 2 mistakes`, () => {
      const answers442 = getSpecifiedPlayerAnswers(4, 4, 2);
      assert.equal(8, summarizePoints(answers442, 3));
    });

    it(`should return 15 points on user 5 correct slow answers, 5 correct fast answers`, () => {
      const answers550 = getSpecifiedPlayerAnswers(5, 5, 0);
      assert.equal(15, summarizePoints(answers550, 3));
    });

    it(`should return not NaN on random answers`, () => {
      const randomPlayerAnswers = getRandomPlayerAnswers(10);
      assert.isNotNaN(summarizePoints(randomPlayerAnswers, 3));
    });
  });
});
