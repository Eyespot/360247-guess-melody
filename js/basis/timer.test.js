import {assert} from "chai";
import {createTimer} from "./timer";

describe(`Check timer function`, () => {
  it(`should throw an error on not number input`, () => {
    const error = () => createTimer(`Brendan Eich`);
    const message = `Wrong input type. Number expected.`;
    assert.throws(error, TypeError, message);
  });

  it(`should throw an error on not integer input`, () => {
    const error = () => createTimer(3.1415926535);
    const message = `Input time should be integer.`;
    assert.throws(error, TypeError, message);
  });

  it(`should throw an error on negative input`, () => {
    const error = () => createTimer(-3);
    const message = `Wrong time value. Natural number expected.`;
    assert.throws(error, RangeError, message);
  });

  it(`should carry given time value on start`, () => {
    assert.equal(createTimer(7).time, 7);
  });

  it(`should carry ticking method`, () => {
    assert.equal(createTimer(345).tick().tick().tick().time, 342);
  });
});
