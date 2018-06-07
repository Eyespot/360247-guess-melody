const TICKER_SIZE = 1;

const timer = (seconds) => {
  return {
    secondsLeft: seconds,
    finished: false,
    tick() {
      if (this.secondsLeft > 0) {
        this.secondsLeft -= TICKER_SIZE;
      }
      if (this.secondsLeft === 0) {
        this.finished = true;

        return `${this.secondsLeft} seconds left`;
      }
      return true;
    }
  };
};

export const createTimer = (seconds) => {
  if (seconds <= 0) {
    throw new Error(`Timer input should be a natural number`);
  }

  return timer(seconds);
};
