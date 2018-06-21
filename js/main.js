import WelcomeView from "./static-screens/welcomeView";
import changeLevel from "./basis/change-screen";
import showScreen from "./basis/show-screen";
import gameData from "./data/game-data";
import getPlayerState from "./data/player-state";

export const goToWelcome = () => {
  const playerState = getPlayerState();
  playerState.answers = [];
  playerState.outcome = {
    timeSpend: {},
    pointsReceived: 0,
    quickPointsReceived: 0,
    mistakes: 0
  };
  const welcomeScreen = new WelcomeView();
  showScreen(welcomeScreen.element);
  welcomeScreen.onStartButtonClick = () => {
    changeLevel(gameData, playerState);
  };
};

document.addEventListener(`DOMContentLoaded`, () => {
  goToWelcome();
});

// export default () => {
//   const playerState = getPlayerState();
//   showScreen(screenWelcome);
//   const startButton = screenWelcome.querySelector(`.main-play`);
//   startButton.onclick = (event) => {
//     event.preventDefault();
//     changeLevel(gameData, playerState);
//   };
// };
