import screenWelcome from "./screen-welcome";
import showScreen from "./show-screen";

export const getGameRestartButton = (screen) => screen.querySelector(`.play-again`) || screen.querySelector(`.main-replay`);
export const onGameRestartButtonClick = (event) => {
  event.preventDefault();
  showScreen(screenWelcome);
};
