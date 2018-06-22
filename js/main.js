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

export const tracks = new Set();
export const pictures = new Set();

const preloadMedia = () => {
  for (const level of gameData) {
    for (const option of gameData[gameData.indexOf(level)].options) {
      if (option.hasOwnProperty(`image`)) {
        pictures.add(option.image);
      } else if (option.hasOwnProperty(`source`)) {
        tracks.add(option.source);
      }
    }
  }
  for (const picture of pictures) {
    const image = new Image();
    image.src = picture;
  }
  for (const track of tracks) {
    const audio = new Audio();
    audio.src = track;
  }
};

document.addEventListener(`DOMContentLoaded`, () => {
  preloadMedia();
  window.addEventListener(`load`, () => {
    goToWelcome();
  });
});
