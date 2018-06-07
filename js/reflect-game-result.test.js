import {assert} from 'chai';
import {getRandomInteger} from "./utils";
import reflectGameResult from "./reflect-game-result";

const getRandomPlayerResult = (maxPoints, maxLives, maxTime) => {
  return {
    pointsReceived: getRandomInteger(5, maxPoints),
    livesLeft: getRandomInteger(0, maxLives),
    timeLeft: getRandomInteger(0, maxTime)
  };
};

const getRandomStatistics = (quantity, maxPoints, maxLives, maxTime) => {
  const stats = [];

  for (let i = 0; i < quantity; i++) {
    stats.push(getRandomPlayerResult(maxPoints, maxLives, maxTime));
  }

  return stats;
};

describe(`Check reflecting game result`, () => {
  it(`should return string`, () => {
    assert.isString(reflectGameResult(getRandomStatistics(100, 20, 3, 97), getRandomPlayerResult(20, 3, 97)));
  });

  it(`should return player defeat string on lives left 0`, () => {
    assert.deepEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, reflectGameResult(getRandomStatistics(100, 20, 3, 97), getRandomPlayerResult(20, 0, 97)));
  });

  it(`should return player defeat string on time left 0`, () => {
    assert.deepEqual(`Время вышло! Вы не успели отгадать все мелодии`, reflectGameResult(getRandomStatistics(100, 20, 3, 97), getRandomPlayerResult(20, 2, 0)));
  });

  it(`should return first place win string with best time left`, () => {
    const winner = {
      pointsReceived: 20,
      livesLeft: 3,
      timeLeft: 255
    };
    assert.deepEqual(`Вы заняли 1 место из 100 игроков. Это лучше, чем у 99% игроков`, reflectGameResult(getRandomStatistics(99, 20, 3, 97), winner));
  });
});
