// import {goToWelcome} from "../main";

export const getGameRestartButton = (screen) => screen.querySelector(`.play-again`) || screen.querySelector(`.main-replay`);
export const onGameRestartButtonClick = (event) => {
  event.preventDefault();
  // goToWelcome();
};
