import GameView from "../../game-view";
import Application from "../../../basis/application";

export default class ModalConfirmationView extends GameView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal-confirm modal-confirm__wrap">
        <form class="modal-confirm__inner">
          <button class="modal-confirm__close" type="button">Закрыть</button>
          <h2 class="modal-confirm__title">Подтверждение</h2>
          <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal-confirm__btn-wrap">
            <button class="modal-confirm__btn modal-confirm__proceed">Ок</button>
            <button class="modal-confirm__btn modal-confirm__cancel">Отмена</button>
          </div>
        </form>
      </section>`;
  }

  stopGame() {
  }

  onEscClose() {
  }

  onClose() {
    document.body.removeChild(document.body.lastElementChild);
    document.removeEventListener(`keydown`, this.onEscClose);
  }

  bind() {
    this.element.querySelector(`.modal-confirm__close`).addEventListener(`click`, (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.onClose();
    });

    this.element.querySelector(`.modal-confirm__proceed`).addEventListener(`click`, (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.stopGame();
      Application.showStart();
      this.onClose();
    });

    this.element.querySelector(`.modal-confirm__cancel`).addEventListener(`click`, (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.onClose();
    });
  }
}
