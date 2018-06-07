import {expect} from "chai";
import {createTimer} from "./timer";

describe(`Check timer function`, () => {
  it(`should throw an error on invalid input`, () => {
    const errorMessage = `Timer input should be a natural number`;
    expect(() => createTimer(0)).to.throw(Error, errorMessage);
    expect(() => createTimer(-7)).to.throw(Error, errorMessage);
  });
  it(`should return finished when timer's left seconds equals 0`, () => {
    const timer = createTimer(1);

    timer.tick();
    expect(timer.secondsLeft).to.equal(0);
    expect(timer.finished).to.equal(true);
    expect(timer.tick()).to.equal(`${timer.secondsLeft} seconds left`);
  });
});
