// import screenLevelGenre from "../dinamic-screens/screen-level-genre";
// import screenResultWin from "../static-screens/screen-result-win";
// import screenResultNoAttempts from "../static-screens/screen-result-no-attempts";
// import screenResultTimeout from "../static-screens/screen-result-timeout";
// import screenLevelArtist from "../dinamic-screens/screen-level-artist";

let currentScreen = document.querySelector(`section.main`);

export default (newScreen) => {
  currentScreen.parentNode.replaceChild(newScreen, currentScreen);
  currentScreen = newScreen;
};

// if (playerState.screen > 9) {
//   return replaceScreen(screenResultWin);
// }
//
// if (playerState.lives < 1) {
//   return replaceScreen(screenResultNoAttempts);
// }
//
// if (playerState.time < 1) {
//   return replaceScreen(screenResultTimeout);
// }
//
// if (gameData[playerState.screen].gameType === `artist`) {
//   return replaceScreen(screenLevelArtist);
// }
//
// return replaceScreen(screenLevelGenre);
