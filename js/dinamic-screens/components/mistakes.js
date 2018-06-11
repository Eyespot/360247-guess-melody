import initialGameState from "../../data/initial-game-state";

export default (state) => {
  return `<div class="main-mistakes">${new Array(initialGameState.lives - state.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}</div>`;
};
