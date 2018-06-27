import GamePresenter from "./game-presenter";
import GenreLevelView from "../view/dinamic-views/level-genre-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";
import Application from "../basis/application";

export default class LevelGenrePresenter extends GamePresenter {
  constructor(model, level) {
    super();

    this.model = model;
    this.level = level;

    this.view = new GenreLevelView(this.level);
    // this.view.audio = audio???;
    this.view.catchAnswerTargetValue = this.catchAnswerTargetValue;
    this.view.stopGame = this.stopGame;
    // this.view.onAnswer = this.onArtistAnswer.bind(this);

    this.mistakes = new MistakesView(this.model.state.lives);

    this.root = this.view.element.firstElementChild;

    this.view.genreFormSubmit = this.view.genreForm.querySelector(`.genre-answer-send`);
    this.view.genreFormCheckboxes = this.view.genreForm.querySelectorAll(`input[type=checkbox]`);
    this.view.labels = this.view.genreForm.querySelectorAll(`.genre-answer-check`);
    this.reflectCorrectAnswerOnDevelopment(this.view.genreFormCheckboxes, this.view.labels, level.correctAnswer, `background-color:lightgreen;border-radius:5px`);
    this.view.onGenreAnswerChange = this.onGenreAnswerChange.bind(this);

    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, this.mistakes.template);

    this.view.checkedAnswers = [];
  }

  onGenreAnswerChange() {
    this.view.checkedAnswers = [];
    this.view.genreFormCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        this.view.checkedAnswers.push(checkbox.value);
      }
    });
    this.view.genreFormSubmit.disabled = (!this.view.checkedAnswers.length > 0);
    console.log(this.view.checkedAnswers);
  }

  // onArtistAnswer(answer) {
	//
  //   const answersMap = {
  //     0: this.level.options[0].isCorrect,
  //     1: this.level.options[1].isCorrect,
  //     2: this.level.options[2].isCorrect
  //   };
  //   const answers = Array.from(event.currentTarget.querySelectorAll(`.main-answer-r`));
  //   const answerNumber = answers.indexOf(answer);
  //   const isCorrect = answersMap[answerNumber];
  //   console.log(isCorrect);
	//
  //   if (!isCorrect) {
  //     this.model.loseLife();
  //   }
	//
  //   if (this.model.isGameLost) {
  //     console.log(`dead`);
  //     Application.showNoAttempts();
  //   } else {
  //     this.view.stopGame();
  //     this.model.nextScreen();
  //     const answerTime = this.view.stopGame();
  //     console.log(answerTime);
	//
  //     this.model.setAnswer({
  //       isCorrect,
  //       isFast: this.getAnswerSpeed(5)
  //     });
	//
  //     if (this.model.isGameFinished) {
  //       // Application.showWinResult(this.model);
  //     }
	//
  //     if (this.model.canTheGameContinue) {
  //       Application.chooseGame(this.model);
  //     }
  //   }
  // }
}
