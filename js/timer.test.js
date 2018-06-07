import {expect} from "chai";
import {createTimer} from "./timer";

describe(`Check timer function`, () => {
  it(`should throw an error on invalid input`, () => {
    const errorMessage = `Timer input should be a natural number`;
    expect(() => createTimer(0)).to.throw(Error, errorMessage);
    expect(() => createTimer(-7)).to.throw(Error, errorMessage);
  });
  it(`should be finished after 1 tick with 1 second on start`, () => {
    const timer = createTimer(1);

    timer.tick();
    expect(timer.secondsLeft).to.equal(0);
    expect(timer.finished).to.equal(true);
    expect(timer.tick()).to.equal(`${timer.secondsLeft} seconds left`);
  });
  it(`should be finished after 2 ticks with 2 seconds on start`, () => {
    const timer = createTimer(2);

    timer.tick();
    timer.tick();
    expect(timer.secondsLeft).to.equal(0);
    expect(timer.finished).to.equal(true);
    expect(timer.tick()).to.equal(`${timer.secondsLeft} seconds left`);
  });
});
