import GamePresenter from "./game-presenter";
import ArtistLevelView from "../view/dinamic-views/level-artist-view";
import ClockView from "../view/dinamic-views/components/clock-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";
import {startTimer, stopTimer, updateClock} from "../basis/utils";
// import Application from;

export default class LevelArtistPresenter extends GamePresenter {
  constructor(model) {
    super();

    this.model = model;
    this.view = new ArtistLevelView(this.model.state.screen);
    this.view.startTimer = startTimer;
    this.view.stopTimer = stopTimer;
    this.view.updateTime = updateClock;
    // this.view.audio = audio???;
    this.view.onAnswer = this.onAnswer;

    this.clockFace = new ClockView(this.model.state.screen);
    this.mistakes = new MistakesView(this.model.state.screen);
    this.root = this.view.element;
    this.appendComponent(this.clockFace.template);
    this.appendComponent(this.mistakes.template);
  }

  onAnswer(answer) {
    if (!answer.isCorrect) {
      this.model.loseLife();
    }

    if (this.model.isGameLost) {
      Application.showLoseResult(this.model);
    } else {
      this.model.nextScreen();

      const answerTime = this.stopTimer();

      this.model.setAnswer({
        isCorrect: answer.result,
        isFast: this.getAnswerSpeed(answerTime)
      });

      if (this.model.isGameFinished) {
        Application.showWinResult(this.model);
      }

      if (this.model.canTheGameContinue) {
        Application.chooseGame(this.model);
      }
    }
  }
}
