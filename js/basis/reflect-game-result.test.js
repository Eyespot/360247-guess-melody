import {assert} from 'chai';
import reflectGameResult from "./reflect-game-result";

const getPlayerResult = (points, lives, time) => {
  return {
    pointsReceived: points,
    livesLeft: lives,
    timeLeft: time
  };
};

const getStatistics = (quantity, points, lives, time) => {
  const stats = [];

  for (let i = 0; i < quantity; i++) {
    stats.push(getPlayerResult(points, lives, time));
  }

  return stats;
};

describe(`Check reflecting game result`, () => {
  it(`should return string`, () => {
    assert.isString(reflectGameResult(getStatistics(500, 20, 3, 97), getPlayerResult(20, 3, 97)));
    assert.isString(reflectGameResult(getStatistics(500, 12, 1, 1), getPlayerResult(5, 0, 77)));
    assert.isString(reflectGameResult(getStatistics(5000, 20, 3, 300), getPlayerResult(20, 3, 0)));
    assert.isString(reflectGameResult(getStatistics(77, 5, 3, 97), getPlayerResult(4, 1, 1)));
  });

  it(`should return player defeat string on lives left 0`, () => {
    assert.deepEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, reflectGameResult(getStatistics(100, 20, 3, 97), getPlayerResult(20, 0, 97)));
    assert.deepEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, reflectGameResult(getStatistics(5, 1, 1, 1), getPlayerResult(20, 0, 500)));
    assert.deepEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, reflectGameResult(getStatistics(100, 20, 3, 97), getPlayerResult(1, 0, 1)));
  });

  it(`should return player defeat string on time left 0`, () => {
    assert.deepEqual(`Время вышло! Вы не успели отгадать все мелодии`, reflectGameResult(getStatistics(54, 11, 1, 97), getPlayerResult(20, 3, 0)));
    assert.deepEqual(`Время вышло! Вы не успели отгадать все мелодии`, reflectGameResult(getStatistics(3, 2, 3, 11), getPlayerResult(5, 2, 0)));
    assert.deepEqual(`Время вышло! Вы не успели отгадать все мелодии`, reflectGameResult(getStatistics(1, 55, 3, 97), getPlayerResult(1, 0, 0)));
  });

  it(`should return first place win string with best time left`, () => {
    assert.deepEqual(`Вы заняли 1 место из 100 игроков. Это лучше, чем у 99% игроков`, reflectGameResult(getStatistics(99, 1, 1, 1), getPlayerResult(1, 1, 2)));
    assert.deepEqual(`Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`, reflectGameResult(getStatistics(4, 1, 1, 1), getPlayerResult(1, 1, 8)));
  });

  it(`should return first place win string with best lives left`, () => {
    assert.deepEqual(`Вы заняли 1 место из 100 игроков. Это лучше, чем у 99% игроков`, reflectGameResult(getStatistics(99, 1, 1, 1), getPlayerResult(1, 2, 1)));
    assert.deepEqual(`Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`, reflectGameResult(getStatistics(4, 1, 1, 1), getPlayerResult(1, 8, 1)));
  });

  it(`should return first place win string with best points`, () => {
    assert.deepEqual(`Вы заняли 1 место из 100 игроков. Это лучше, чем у 99% игроков`, reflectGameResult(getStatistics(99, 1, 1, 1), getPlayerResult(2, 1, 1)));
    assert.deepEqual(`Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`, reflectGameResult(getStatistics(4, 1, 1, 1), getPlayerResult(5, 1, 1)));
  });

  it(`should return last place result string with worst lives left`, () => {
    assert.deepEqual(`Вы заняли 100 место из 100 игроков. Это лучше, чем у 0% игроков`, reflectGameResult(getStatistics(99, 20, 3, 500), getPlayerResult(20, 2, 600)));
  });
});
