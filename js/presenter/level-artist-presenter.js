import GamePresenter from "./game-presenter";
import ArtistLevelView from "../view/dinamic-views/level-artist-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";
import ClockView from "../view/dinamic-views/components/clock-view";

export default class LevelArtistPresenter extends GamePresenter {
  constructor(model, level) {
    super();

    this.model = model;
    this.level = level;
    this.view = new ArtistLevelView(this.level);
    this.clockFace = new ClockView(this.model.state.timer.time);
    this.mistakes = new MistakesView(--this.model.state.lives);
    // this.view.audio = audio???;
    this.view.onAnswer = this.onAnswer;
    this.root = this.view.element.firstElementChild;
    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, this.mistakes.template);
    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, this.clockFace.template);
  }

  onAnswer(answer) {
    if (!answer.isCorrect) {
      this.model.loseLife();
    }

    if (this.model.isGameLost) {
      // Application.showLoseResult(this.model);
    } else {
      this.model.nextScreen();

      const answerTime = this.stopTimer();

      this.model.setAnswer({
        isCorrect: answer.result,
        isFast: this.getAnswerSpeed(answerTime)
      });

      if (this.model.isGameFinished) {
        // Application.showWinResult(this.model);
      }

      if (this.model.canTheGameContinue) {
        // Application.chooseGame(this.model);
      }
    }
  }
}
