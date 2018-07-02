import LevelArtistPresenter from "../presenter/level-artist-presenter";
import LevelGenrePresenter from "../presenter/level-genre-presenter";
import ResultTimeoutPresenter from "../presenter/result-timeout-presenter";
import ResultNoAttemptsPresenter from "../presenter/result-no-attempts-presenter";
import ResultWinPresenter from "../presenter/result-win-presenter";
import WelcomePresenter from "../presenter/welcome-presenter";
import PreloadPresenter from "../presenter/preload-presenter";
import ApplicationModel from "../data/application-model";
import ErrorView from "../view/dinamic-views/components/error-view";
import ModalConfirmationView from "../view/dinamic-views/components/modal-confirmation-view";
import GameDataTransfer from "../data/game-data-transfer";
import {adaptServerData} from "../data/game-data-adapter";
import MediaPreloader from "../data/media-preloader";
import {getCurrentStatistics, summarizePoints} from "./utils";

const ESC_KEYCODE = 27;

let gameData;

class Application {

  static showStart() {
    const preload = new PreloadPresenter();
    preload.showScreen();

    GameDataTransfer.loadData()
      .then((data) => adaptServerData(data))
      .then((data) => {
        gameData = data;
        const model = new ApplicationModel(gameData);
        const welcome = new WelcomePresenter(model);
        const media = new MediaPreloader(gameData);
        const links = media.addLoaders();

        Promise.all(links).then(() => welcome.showScreen());
      }).catch(MediaPreloader.onError);
  }

  static replay() {
    const model = new ApplicationModel(gameData);
    this.chooseGame(model);
  }

  static chooseGame(model) {
    GameSelector[model.gameType](model);
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
    model.state.outcome.pointsReceived = summarizePoints(model.state);
    model.state.currentStatistics = getCurrentStatistics(model.state);
    GameDataTransfer.uploadStatistics(model.state.currentStatistics)
      .then(() => GameDataTransfer.downloadStatistics())
      .then((statistics) => {
        model.state.gamesStatistics = statistics;
        const winScreen = new ResultWinPresenter(model);
        winScreen.showScreen();
      }).catch(Application.showError);
  }

  static showTimeout() {
    const timeOutScreen = new ResultTimeoutPresenter();
    timeOutScreen.showScreen();
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal(error);
  }

  static showModal(stopGame) {
    const modalConfirmation = new ModalConfirmationView();
    const modalElement = modalConfirmation.element;
    modalConfirmation.stopGame = stopGame;
    modalConfirmation.onEscClose = (event) => {
      if (event.keyCode === ESC_KEYCODE) {
        modalConfirmation.onClose();
      }
    };
    document.addEventListener(`keydown`, modalConfirmation.onEscClose);
    document.body.appendChild(modalElement);
  }
}

const GameSelector = {
  'artist': Application.showArtist,
  'genre': Application.showGenre
};

export default Application;
