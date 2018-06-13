import gameSettings from "./game-settings";

const START_SCREEN = 0;

export default Object.freeze(
    {
      lives: gameSettings.ATTEMPTS,
      time: gameSettings.START_TIME,
      screen: START_SCREEN,
      answers: [],
      outcome: {
        timeSpend: {},
        pointsReceived: 0,
        quickPointsReceived: 0,
        mistakes: 0
      }
    }
);
