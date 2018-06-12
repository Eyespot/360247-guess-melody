import showScreen from "./show-screen";
import resultScreenTimeout from "../static-screens/screen-result-timeout";
import resultScreenNoAttempts from "../static-screens/screen-result-no-attempts";
import resultScreenWin from "../static-screens/screen-result-win";
import showGenreLevel from "../dinamic-screens/screen-level-genre";
import showArtistLevel from "../dinamic-screens/screen-level-artist";
import {getFinalResult} from "../static-screens/screen-result-win";

const QUESTIONS_QUANTITY = 10;

const screenSwitcher = (data, state) => {
  const level = state.screen;

  if (!state.lives) {
    showScreen(resultScreenNoAttempts);
  } else if (state.screen === QUESTIONS_QUANTITY) {
    const comparisonMessage = resultScreenWin.querySelector(`.main-comparison`);
    comparisonMessage.textContent = getFinalResult(state);
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
