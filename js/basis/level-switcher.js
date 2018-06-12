import showScreen from "./show-screen";
import resultScreenTimeout from "../static-screens/screen-result-timeout";
import resultScreenNoAttempts from "../static-screens/screen-result-no-attempts";
import resultScreenWin from "../static-screens/screen-result-win";
import showGenreLevel from "../dinamic-screens/screen-level-genre";
import showArtistLevel from "../dinamic-screens/screen-level-artist";

const QUESTIONS_QUANTITY = 4;

const screenSwitcher = (data, state) => {
  const level = state.screen;
  console.log(level);
  console.log(state.lives);

  if (!state.lives) {
    showScreen(resultScreenNoAttempts);
  } else if (state.screen === QUESTIONS_QUANTITY) {
    showScreen(resultScreenWin);
  } else if (!state.time) {
    showScreen(resultScreenTimeout);
  } else if (data[level].gameType === `artist`) {
    showArtistLevel(state);
  } else if (data[level].gameType === `genre`) {
    showGenreLevel(state);
  }
};

export default screenSwitcher;
