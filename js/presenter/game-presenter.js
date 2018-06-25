import {getComponentDestination} from "../basis/utils";
import gameSettings from "../data/game-settings";

export default class GamePresenter {
  constructor(model) {
    this.model = model;
  }

  gameRestart() {
    this.model.restart();
    // Application.chooseScreen(this.model);
  }

  appendComponent(component) {
    const destination = getComponentDestination();
    destination.insertAdjacentHTML(`afterEnd`, component);
  }

  getAnswerSpeed(answerTime) {
    return (answerTime < gameSettings.FAST_ANSWER);
  }
}
