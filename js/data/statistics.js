import {getRandomInteger} from "../basis/utils";
export const statistics = [
  {
    pointsReceived: getRandomInteger(6, 20),
    livesLeft: getRandomInteger(1, 3),
    timeLeft: getRandomInteger(70, 201)
  },
  {
    pointsReceived: getRandomInteger(6, 20),
    livesLeft: getRandomInteger(1, 3),
    timeLeft: getRandomInteger(70, 201)
  },
  {
    pointsReceived: getRandomInteger(6, 20),
    livesLeft: getRandomInteger(1, 3),
    timeLeft: getRandomInteger(70, 201)
  },
  {
    pointsReceived: getRandomInteger(6, 20),
    livesLeft: getRandomInteger(1, 3),
    timeLeft: getRandomInteger(70, 201)
  },
  {
    pointsReceived: getRandomInteger(6, 20),
    livesLeft: getRandomInteger(1, 3),
    timeLeft: getRandomInteger(70, 201)
  }
];

const getCurrentStatistics = (state, points) => {
  return {
    pointsReceived: points,
    livesLeft: state.lives,
    timeLeft: state.time
  };
};

export default getCurrentStatistics;
