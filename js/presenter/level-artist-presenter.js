import ApplicationPresenter from "./application-presenter";
import ArtistLevelView from "../view/dinamic-views/level-artist-view";
import MistakesView from "../view/dinamic-views/components/mistakes-view";

export default class LevelArtistPresenter extends ApplicationPresenter {
  constructor(model, level) {
    super();

    this.model = model;
    this.level = level;

    this.view = new ArtistLevelView(this.level);
    this.view.catchAnswerTargetValue = LevelArtistPresenter.catchAnswerTargetValue;
    this.view.stopGame = this.stopGame.bind(this);
    this.view.onAnswer = this.onArtistAnswer.bind(this);
    this.view.onPlayerButtonClick = this.onPlayerButtonClick;
    this.mistakes = new MistakesView(this.model.state.lives);

    this.view.radio = this.view.element.querySelectorAll(`.main-answer-r`);
    this.view.labels = this.view.element.querySelectorAll(`.main-answer`);
    ApplicationPresenter.reflectCorrectAnswerOnDevelopment(this.view.radio, this.view.labels, `true`, `font-weight:900;background-color:lightgreen;border-radius:15px`);

    this.root = this.view.element.firstElementChild;
    this.root.firstElementChild.insertAdjacentHTML(`afterEnd`, this.mistakes.template);
  }

  onArtistAnswer(event, answer) {

    const answersMap = {
      0: this.level.options[0].isCorrect,
      1: this.level.options[1].isCorrect,
      2: this.level.options[2].isCorrect
    };
    const answers = Array.from(event.currentTarget.querySelectorAll(`.main-answer-r`));
    const answerNumber = answers.indexOf(answer);
    this.isAnswerCorrect = answersMap[answerNumber];

    this.progressOnAnswer();
  }

  static catchAnswerTargetValue(event) {
    return event.target.parentNode.previousElementSibling;
  }
}
