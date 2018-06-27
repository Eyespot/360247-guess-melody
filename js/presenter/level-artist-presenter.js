import GamePresenter from "./game-presenter";
import ArtistLevelView from "../view/dinamic-views/level-artist-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";
import Application from "../basis/application";

export default class LevelArtistPresenter extends GamePresenter {
  constructor(model, level) {
    super();

    this.model = model;
    this.level = level;

    this.view = new ArtistLevelView(this.level);
    // this.view.audio = audio???;
    this.view.catchAnswerTargetValue = this.catchAnswerTargetValue;
    this.view.stopGame = this.stopGame;
    this.view.onAnswer = this.onArtistAnswer.bind(this);
    this.mistakes = new MistakesView(this.model.state.lives);

    this.view.radio = this.view.element.querySelectorAll(`.main-answer-r`);
    this.view.labels = this.view.element.querySelectorAll(`.main-answer`);
    this.reflectCorrectAnswerOnDevelopment(this.view.radio, this.view.labels, `true`, `font-weight:900;background-color:lightgreen;border-radius:15px`);

    this.root = this.view.element.firstElementChild;
    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, this.mistakes.template);
  }

  catchAnswerTargetValue(event) {
    return event.target.parentNode.previousElementSibling;
  }

  onArtistAnswer(answer) {

    const answersMap = {
      0: this.level.options[0].isCorrect,
      1: this.level.options[1].isCorrect,
      2: this.level.options[2].isCorrect
    };
    const answers = Array.from(event.currentTarget.querySelectorAll(`.main-answer-r`));
    const answerNumber = answers.indexOf(answer);
    const isCorrect = answersMap[answerNumber];
    console.log(isCorrect);

    if (!isCorrect) {
      this.model.loseLife();
    }

    if (this.model.isGameLost) {
      console.log(`dead`);
      Application.showNoAttempts();
    } else {
      this.view.stopGame();
      this.model.nextScreen();
      const answerTime = this.view.stopGame();
      console.log(answerTime);

      this.model.setAnswer({
        isCorrect,
        isFast: this.getAnswerSpeed(5)
      });

      if (this.model.isGameFinished) {
        // Application.showWinResult(this.model);
      }

      if (this.model.canTheGameContinue) {
        Application.chooseGame(this.model);
      }
    }
  }
}
