import gameSettings from "../data/game-settings";
import showScreen from "./show-screen";
import ResultTimeoutView from "../view/static-views/result-timeout-view";
import ResultNoAttemptsView from "../view/static-views/result-no-attempts-view";
import ResultWinView from "../view/static-views/result-win-view";
import ArtistLevelView from "../view/dinamic-views/level-artist-view";
import GenreLevelView from "../view/dinamic-views/level-genre-view";
import ClockView from "../view/dinamic-views/components/clock-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";
// import {appendComponent, reflectCorrectAnswerOnDevelopment} from "../basis/utils";
import {getFinalResult, getStatisticsMessage} from "./sum-up";
import {onArtistAnswer, onGenreAnswerChange, onGenreFormSubmitClick} from "./screens-listeners";
import {playFirstTrack, onPlayerButtonClick} from "../view/dinamic-views/components/audio";
// import {startTimer} from "../basis/timer";

const levelsQuantity = gameSettings.LEVELS_QUANTITY;


const changeScreen = (data, state) => {
  const level = state.screen;
  // startTimer(state.timer);

  if (!state.lives) {
    const screenNoAttemptsResult = new ResultNoAttemptsView();
    showScreen(screenNoAttemptsResult.element);
  } else if (!state.timer) {
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
    const screenArtistLevel = new ArtistLevelView(data[state.screen]);
    const clockFace = new ClockView(state.time);
    const mistakesReflection = new MistakesView(state.lives);

    screenArtistLevel.onArtistAnswerClick = (event) => {
      onArtistAnswer(event, data, state);
    };

    // screenArtistLevel.reflectCorrectAnswerOnDevelopment = () => {
    //   reflectCorrectAnswerOnDevelopment(screenArtistLevel.radio, screenArtistLevel.labels, `true`, `font-weight:900;background-color:lightgreen;border-radius:15px`);
    // };

    screenArtistLevel.onPlayerButtonClick = (event) => {
      onPlayerButtonClick(event);
    };

    showScreen(screenArtistLevel.element);
    // appendComponent(mistakesReflection.template);
    // appendComponent(clockFace.template);
    screenArtistLevel.reflectCorrectAnswerOnDevelopment();
    playFirstTrack(screenArtistLevel.firstTrack, screenArtistLevel.firstPlayButton, data[level]);
  } else if (data[level].gameType === `genre`) {
    const screenGenreLevel = new GenreLevelView(data[state.screen]);
    const clockFace = new ClockView(state.time);
    const mistakesReflection = new MistakesView(state.lives);

    screenGenreLevel.onGenreAnswerChange = () => {
      onGenreAnswerChange(screenGenreLevel.genreFormCheckboxes, screenGenreLevel.genreFormSubmit);
    };

    screenGenreLevel.onGenreFormSubmitClick = () => {
      onGenreFormSubmitClick(data, state);
    };

    // screenGenreLevel.reflectCorrectAnswerOnDevelopment = () => {
    //   reflectCorrectAnswerOnDevelopment(screenGenreLevel.genreFormCheckboxes, screenGenreLevel.labels, data[level].correctAnswer, `background-color:lightgreen;border-radius:5px`);
    // };

    screenGenreLevel.onPlayerButtonClick = (event) => {
      onPlayerButtonClick(event);
    };

    showScreen(screenGenreLevel.element);
    // appendComponent(mistakesReflection.template);
    // appendComponent(clockFace.template);
    screenGenreLevel.reflectCorrectAnswerOnDevelopment();
    playFirstTrack(screenGenreLevel.firstTrack, screenGenreLevel.firstPlayButton, data[level]);
  }
};

export default changeScreen;
