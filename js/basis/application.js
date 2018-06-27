import ArtistLevelPresenter from "../presenter/level-artist-presenter";
import WelcomePresenter from "../presenter/welcome-presenter";
import GameModel from "../data/game-model";
import gameData from "../data/game-data";
import ResultTimeoutPresenter from "../presenter/result-timeout-presenter";
import ResultNoAttemptsPresenter from "../presenter/result-no-attempts-presenter";

const FIRST_LEVEL_INDEX = 1;

class Application {

  static showWelcome() {
    const model = new GameModel();
    const welcome = new WelcomePresenter(model);
    welcome.showScreen();
  }

  static replay() {
    const model = new GameModel();
    model.state.screen = FIRST_LEVEL_INDEX;
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
