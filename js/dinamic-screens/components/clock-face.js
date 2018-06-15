import {calculateMinutes} from "../../basis/utils";

const getTimeReflection = (time) => (time < 10) ? `0` + time : time;

export default (state) => {
  const time = calculateMinutes(state.time);

  return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(../..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getTimeReflection(time.minutes)}</span>
        <span class="timer-value-dots">:</span>
        <span class="timer-value-secs">${getTimeReflection(time.seconds)}</span>
      </div>
    </svg>`;
};
