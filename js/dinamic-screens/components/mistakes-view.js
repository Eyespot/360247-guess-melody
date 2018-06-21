import initialGameState from "../../data/initial-game-state";
import AbstractView from "../../view/application-view";

const initialLives = initialGameState.lives;

export default class MistakesView extends AbstractView {
  constructor(lives) {
    super();
    this.lives = lives;
  }

  get template() {
    return `<div class="main-mistakes">${new Array(initialLives - this.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}</div>`;
  }
}
