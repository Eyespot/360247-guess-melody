import ArtistLevelPresenter from "../presenter/level-artist-presenter";
import WelcomePresenter from "../presenter/welcome-presenter";
import GameModel from "../data/game-model";
import gameData from "../data/game-data";

export default class Application {

  static showWelcome() {
    const model = new GameModel();
    const welcome = new WelcomePresenter(model);
    welcome.showScreen();
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

  static showLose(model) {
  }

  static showWin(model) {
  }

  static showTimeout(model) {
  }
}

const gameSelector = {
  'artist': Application.showArtist,
  'genre': Application.showGenre
};
