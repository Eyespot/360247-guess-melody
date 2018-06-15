import showScreenWelcome from "../static-screens/screen-welcome";

export const getGameRestartButton = (screen) => screen.querySelector(`.play-again`) || screen.querySelector(`.main-replay`);
export const onGameRestartButtonClick = (event) => {
  event.preventDefault();
  showScreenWelcome();
};
