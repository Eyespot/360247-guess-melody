import LevelArtistPresenter from "../presenter/level-artist-presenter";
import LevelGenrePresenter from "../presenter/level-genre-presenter";
import ResultTimeoutPresenter from "../presenter/result-timeout-presenter";
import ResultNoAttemptsPresenter from "../presenter/result-no-attempts-presenter";
import ResultWinPresenter from "../presenter/result-win-presenter";
import WelcomePresenter from "../presenter/welcome-presenter";
import PreloadPresenter from "../presenter/preload-presenter";
import GameModel from "../data/game-model";
import ErrorView from "../view/dinamic-views/components/error-view";
import {adaptServerData} from "../data/game-data-adapter";
import preloadMedia from "../data/preload-media";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameData;

class Application {

  static showPreload() {
    const preload = new PreloadPresenter();
    preload.showScreen();
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => adaptServerData(data))
      .then((data) => {
        gameData = data;
      })
      .then(() => preloadMedia(gameData))
      .then(() => Application.showWelcome())
      .catch(Application.showError);
  }

  static showWelcome() {
    const model = new GameModel(gameData);
    const welcome = new WelcomePresenter(model);
    welcome.showScreen();
  }

  static replay() {
    const model = new GameModel(gameData);
    this.chooseGame(model);
  }

  static chooseGame(model) {
    gameSelector[model.gameType](model);
  }

  static showArtist(model) {
    const artistScreen = new LevelArtistPresenter(model, gameData[model.state.screen]);
    artistScreen.showScreen();
    artistScreen.startGame();
  }

  static showGenre(model) {
    const genreScreen = new LevelGenrePresenter(model, gameData[model.state.screen]);
    genreScreen.showScreen();
    genreScreen.startGame();
  }

  static showNoAttempts() {
    const noAttemptsScreen = new ResultNoAttemptsPresenter();
    noAttemptsScreen.showScreen();
  }

  static showWin(model) {
    const winScreen = new ResultWinPresenter(model);
    winScreen.showScreen();
  }

  static showTimeout() {
    const timeOutScreen = new ResultTimeoutPresenter();
    timeOutScreen.showScreen();
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal();
  }
}

const gameSelector = {
  'artist': Application.showArtist,
  'genre': Application.showGenre
};

export default Application;
