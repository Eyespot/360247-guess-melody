import ArtistLevelPresenter from "../presenter/level-artist-presenter";
import WelcomePresenter from "../presenter/welcome-presenter";
import GameModel from "../data/game-model";
import gameData from "../data/game-data";
import ResultTimeoutPresenter from "../presenter/result-timeout-presenter";
import ResultNoAttemptsPresenter from "../presenter/result-no-attempts-presenter";
import LevelGenrePresenter from "../presenter/level-genre-presenter";

class Application {

  static showWelcome() {
    const model = new GameModel();
    const welcome = new WelcomePresenter(model);
    welcome.showScreen();
  }

  static replay() {
    const model = new GameModel();
    this.chooseGame(model);
  }

  static chooseGame(model) {
    gameSelector[model.gameType](model);
  }

  static showArtist(model) {
    const artistScreen = new ArtistLevelPresenter(model, gameData[model.state.screen]);
    artistScreen.showScreen();
    artistScreen.startGame();
  }

  static showGenre(model) {
    const genreScreen = new LevelGenrePresenter(model, gameData[model.state.screen]);
    genreScreen.showScreen();
    genreScreen.startGame();
  }

  static showNoAttempts() {
    const NoAttemptsScreen = new ResultNoAttemptsPresenter();
    NoAttemptsScreen.showScreen();
  }

  static showWin(model) {
  }

  static showTimeout() {
    const timeOutScreen = new ResultTimeoutPresenter();
    timeOutScreen.showScreen();
  }
}

const gameSelector = {
  'artist': Application.showArtist,
  'genre': Application.showGenre
};

export default Application;
