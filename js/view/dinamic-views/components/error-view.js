import GameView from "../../game-view";

export default class ErrorView extends GameView {
  constructor(error) {
    super();

    this.error = error;
  }

  get template() {
    return `
      <section class="modal-error modal-error__wrap">
        <div class="modal-error__inner">
          <h2 class="modal-error__title">Произошла ошибка!</h2>
          <p class="modal-error__text">Статус: ${this.error.message}. Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>
    `;
  }

  showModal() {
    document.body.appendChild(this.element);
  }
}
