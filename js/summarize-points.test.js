import {assert} from 'chai';
import {getRandomInteger} from "./utils";
import summarizePoints from "./summarize-points";

const playerAnswerTemplates = {
  incorrectAnswer: {correct: false, fast: false},
  correctSlowAnswer: {correct: true, fast: false},
  correctFastAnswer: {correct: true, fast: true}
};

const generateAnswer = (template) => {
  const answer = Object.assign({}, template);
  if (!getRandomInteger(0, 1)) {

    return answer;
  }
  answer.correct = true;
  let answerTiming = getRandomInteger(0, 75);
  if (answerTiming < 30) {
    answer.fast = true;
  }

  return answer;
};

const getRandomPlayerAnswers = (length) => {
  const answers = [];

  for (let i = 0; i < length; i++) {
    answers.push(generateAnswer(playerAnswerTemplates.incorrectAnswer));
  }

  return answers;
};

const getSpecifiedPlayerAnswers = (correctSlow, correctFast, mistakes) => {
  const answers = [];
  for (let i = 1; i <= correctSlow; i++) {
    answers.push(playerAnswerTemplates.correctSlowAnswer);
  }
  for (let i = 1; i <= correctFast; i++) {
    answers.push(playerAnswerTemplates.correctFastAnswer);
  }
  for (let i = 1; i <= mistakes; i++) {
    answers.push(playerAnswerTemplates.incorrectAnswer);
  }

  return answers;
};

describe(`Check statistics`, () => {
  describe(`Check points summarizing`, () => {
    it(`should return -1 on user answers insufficient`, () => {
      const answersInsufficient = getSpecifiedPlayerAnswers(2, 5, 0);
      assert.equal(-1, summarizePoints(answersInsufficient, 3));
    });

    it(`should return -1 on 3 user mistakes`, () => {
      const overmuchMistakes = getSpecifiedPlayerAnswers(2, 5, 3);
      assert.equal(-1, summarizePoints(overmuchMistakes, 3));
    });

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

    it(`should return -1 or greater on random answers`, () => {
      const randomPlayerAnswers = getRandomPlayerAnswers(10);
      assert.isAtLeast(summarizePoints(randomPlayerAnswers, 3), -1);
    });

    it(`should return not NaN on random answers`, () => {
      const randomPlayerAnswers = getRandomPlayerAnswers(10);
      assert.isNotNaN(summarizePoints(randomPlayerAnswers, 3));
    });
  });
});
