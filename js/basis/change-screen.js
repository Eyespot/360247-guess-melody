import gameSettings from "../data/game-settings";
import showScreen from "./show-screen";
import resultScreenTimeout from "../static-screens/screen-result-timeout";
import resultScreenNoAttempts from "../static-screens/screen-result-no-attempts";
import resultScreenWin from "../static-screens/screen-result-win";
import showGenreLevel from "../dinamic-screens/screen-level-genre";
import showArtistLevel from "../dinamic-screens/screen-level-artist";
import {getFinalResult, getStatisticsMessage} from "../static-screens/screen-result-win";

const levelsQuantity = gameSettings.LEVELS_QUANTITY;

const changeScreen = (data, state) => {
  const level = state.screen;

  if (!state.lives) {
    showScreen(resultScreenNoAttempts);
  } else if (state.screen === levelsQuantity) {
    const comparisonMessage = resultScreenWin.querySelector(`.main-comparison`);
    comparisonMessage.textContent = getFinalResult(state);
    const statisticsMessage = resultScreenWin.querySelector(`.main-stat`);
    statisticsMessage.innerHTML = getStatisticsMessage(state);

    showScreen(resultScreenWin);
  } else if (!state.time) {
    showScreen(resultScreenTimeout);
  } else if (data[level].gameType === `artist`) {
    showArtistLevel(state);
  } else if (data[level].gameType === `genre`) {
    showGenreLevel(state);
  }
};

export default changeScreen;
