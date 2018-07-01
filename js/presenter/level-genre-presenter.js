import ApplicationPresenter from "./application-presenter";
import GenreLevelView from "../view/dinamic-views/level-genre-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";

export default class LevelGenrePresenter extends ApplicationPresenter {
  constructor(model, level) {
    super();

    this.model = model;
    this.level = level;

    this.view = new GenreLevelView(this.level);
    this.view.onPlayerButtonClick = this.onPlayerButtonClick;
    this.view.stopGame = this.stopGame.bind(this);
    this.view.onGenreFormSubmitClick = this.onGenreFormSubmitClick.bind(this);

    this.mistakes = new MistakesView(this.model.state.lives);

    this.root = this.view.element.firstElementChild;
    this.view.getGameRestartButton = this.getGameRestartButton;


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
  }

  onGenreFormSubmitClick() {
    const correctAnswer = this.level.correctAnswer;
    let correctAnswersQuantity = 0;
    this.level.options.forEach((option) => {
      if (option.genre === correctAnswer) {
        correctAnswersQuantity++;
      }
    });
    const checkValue = (value) => value === correctAnswer;
    this.isAnswerCorrect = this.view.checkedAnswers.every(checkValue) && this.view.checkedAnswers.length === correctAnswersQuantity;

    this.progressOnAnswer();
  }
}
