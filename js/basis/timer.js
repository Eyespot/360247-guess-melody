import gameSettings from "../data/game-settings";

const TICKER_SIZE = 1;
const CIRCLE_RADIUS = 370;

export const createTimer = (startTime) => {
  if (typeof startTime !== `number`) {
    throw new TypeError(`Wrong input type. Number expected.`);
  }

  if (!Number.isInteger(startTime)) {
    throw new TypeError(`Input time should be integer.`);
  }

  if (startTime < 0) {
    throw new RangeError(`Wrong time value. Natural number expected.`);
  }

  return Object.freeze(
      {
        time: startTime,
        tick() {
          return createTimer(startTime - TICKER_SIZE);
        }
      }
  );
};

export const getCircleFace = (time) => {
  const stroke = Math.round(2 * Math.PI * CIRCLE_RADIUS);
  const offset = stroke - Math.round(stroke * (time / gameSettings.START_TIME));

  return {stroke, offset};
};
