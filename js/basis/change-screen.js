import gameSettings from "../data/game-settings";
import showScreen from "./show-screen";
import ResultTimeoutView from "../static-screens/result-timeout-view";
import ResultNoAttemptsView from "../static-screens/result-no-attempts-view";
import ResultWinView from "../static-screens/result-win-view";
import ArtistLevelView from "../dinamic-screens/level-artist-view";
import GenreLevelView from "../dinamic-screens/level-genre-view";
import ClockView from "../dinamic-screens/components/clock-view";
import MistakesView from "../dinamic-screens/components/mistakes-view";
import {appendComponent} from "../basis/utils";
import {getFinalResult, getStatisticsMessage} from "../basis/sumUp";
import {onArtistAnswer, onGenreAnswerChange, onGenreFormSubmitClick} from "./screens-listeners";

const levelsQuantity = gameSettings.LEVELS_QUANTITY;

const changeScreen = (data, state) => {
  const level = state.screen;

  if (!state.lives) {
    const screenNoAttemptsResult = new ResultNoAttemptsView();
    showScreen(screenNoAttemptsResult.element);
  } else if (!state.time) {
    const screenTimeoutResult = new ResultTimeoutView();
    showScreen(screenTimeoutResult.element);
  } else if (state.screen === levelsQuantity) {
    const screenWinResult = new ResultWinView();
    const comparisonMessage = screenWinResult.comparisonMessage;
    comparisonMessage.textContent = getFinalResult(state);
    const statisticsMessage = screenWinResult.statisticsMessage;
    statisticsMessage.innerHTML = getStatisticsMessage(state);
    showScreen(screenWinResult.element);
  } else if (data[level].gameType === `artist`) {
    const screenArtistLevel = new ArtistLevelView(data, state);
    const clockFace = new ClockView(state.time);
    const mistakesReflection = new MistakesView(state.lives);

    screenArtistLevel.onArtistAnswerClick = (event) => {
      onArtistAnswer(event, data, state);
    };

    screenArtistLevel.reflectCorrectAnswerOnDevelopment();

    showScreen(screenArtistLevel.element);
    appendComponent(mistakesReflection.template);
    appendComponent(clockFace.template);
  } else if (data[level].gameType === `genre`) {
    const screenGenreLevel = new GenreLevelView(data, state);
    const clockFace = new ClockView(state.time);
    const mistakesReflection = new MistakesView(state.lives);

    screenGenreLevel.onGenreAnswerChange = () => {
      onGenreAnswerChange(screenGenreLevel.genreFormCheckboxes, screenGenreLevel.genreFormSubmit);
    };

    screenGenreLevel.onGenreFormSubmitClick = () => {
      onGenreFormSubmitClick(data, state);
    };

    screenGenreLevel.reflectCorrectAnswerOnDevelopment();

    showScreen(screenGenreLevel.element);
    appendComponent(mistakesReflection.template);
    appendComponent(clockFace.template);
  }
};

export default changeScreen;
