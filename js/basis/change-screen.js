import gameSettings from "../data/game-settings";
import showScreen from "./show-screen";
import ResultWinView from "../view/static-views/result-win-view";
import {getFinalResult, getStatisticsMessage} from "./sum-up";
import {onArtistAnswer, onGenreAnswerChange, onGenreFormSubmitClick} from "./screens-listeners";
import {playFirstTrack, onPlayerButtonClick} from "../view/dinamic-views/components/audio";

const levelsQuantity = gameSettings.LEVELS_QUANTITY;


const changeScreen = (data, state) => {
  const level = state.screen;

  if (!state.lives) {
  } else if (!state.timer) {
  } else if (state.screen === levelsQuantity) {
    const screenWinResult = new ResultWinView();
    const comparisonMessage = screenWinResult.comparisonMessage;
    comparisonMessage.textContent = getFinalResult(state);
    const statisticsMessage = screenWinResult.statisticsMessage;
    statisticsMessage.innerHTML = getStatisticsMessage(state);
    showScreen(screenWinResult.element);
  } else if (data[level].gameType === `artist`) {

    screenArtistLevel.onPlayerButtonClick = (event) => {
      onPlayerButtonClick(event);
    };
    playFirstTrack(screenArtistLevel.firstTrack, screenArtistLevel.firstPlayButton, data[level]);
  } else if (data[level].gameType === `genre`) {

    screenGenreLevel.onGenreAnswerChange = () => {
      onGenreAnswerChange(screenGenreLevel.genreFormCheckboxes, screenGenreLevel.genreFormSubmit);
    };

    screenGenreLevel.onGenreFormSubmitClick = () => {
      onGenreFormSubmitClick(data, state);
    };

    screenGenreLevel.onPlayerButtonClick = (event) => {
      onPlayerButtonClick(event);
    };

    showScreen(screenGenreLevel.element);
    playFirstTrack(screenGenreLevel.firstTrack, screenGenreLevel.firstPlayButton, data[level]);
  }
};

export default changeScreen;
