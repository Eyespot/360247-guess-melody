import {calculateMinutes} from "../../../basis/utils";
import AbstractView from "../../game-view";
import {getCircleFace} from "../../../basis/timer";

const SHORT_TIME_STYLE = `style="animation: blink 1000ms steps(1, end) infinite; color: crimson"`;

export default class ClockView extends AbstractView {
  constructor(time) {
    super();
    this.timeInSeconds = time;
    this.timeInMinutes = calculateMinutes(this.timeInSeconds);
    this.circleFace = getCircleFace(this.timeInSeconds);
  }

  reflectTime(value) {
    return (value < 10) ? `0` + value : value;
  }

  getShortTimeAnimation() {
    if (this.timeInSeconds < 30) {
      return SHORT_TIME_STYLE;
    }
    return ``;
  }

  get template() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" stroke-dasharray="${this.circleFace.stroke}" stroke-dashoffset="${this.circleFace.offset}"></circle>

      <div ${this.getShortTimeAnimation()} class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins ">${this.reflectTime(this.timeInMinutes.minutes)}</span>
        <span class="timer-value-dots">:</span>
        <span class="timer-value-secs">${this.reflectTime(this.timeInMinutes.seconds)}</span>
      </div>
    </svg>`;
  }
}
