import LevelArtistPresenter from "../presenter/level-artist-presenter";
import LevelGenrePresenter from "../presenter/level-genre-presenter";
import ResultTimeoutPresenter from "../presenter/result-timeout-presenter";
import ResultNoAttemptsPresenter from "../presenter/result-no-attempts-presenter";
import ResultWinPresenter from "../presenter/result-win-presenter";
import WelcomePresenter from "../presenter/welcome-presenter";
import PreloadPresenter from "../presenter/preload-presenter";
import GameModel from "../data/game-model";
import ErrorView from "../view/dinamic-views/components/error-view";
import GameDataTransfer from "../data/game-data-transfer";
import {adaptServerData} from "../data/game-data-adapter";
import MediaPreloader from "../data/media-preloader";

let gameData;

class Application {

  static showStart() {
    const preload = new PreloadPresenter();
    preload.showScreen();

    GameDataTransfer.loadData()
      .then((data) => adaptServerData(data))
      .then((data) => {
        gameData = data;
        const model = new GameModel(gameData);
        const welcome = new WelcomePresenter(model);
        new MediaPreloader(gameData).appendPreloadLinks();

        setTimeout(() => {
          welcome.showScreen();
        }, 25000);

        // Promise.all(links).then(() => welcome.showScreen());
      }).catch(Application.showError);
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
    GameDataTransfer.downloadStatistics().then((statistics) => {
      model.state.gamesStatistics = statistics;
      const winScreen = new ResultWinPresenter(model);
      winScreen.showScreen();
    }).then(() => {
      GameDataTransfer.uploadStatistics(model.state.currentStatistics);
    }).catch(Application.showError);
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
