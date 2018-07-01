import ApplicationView from "../game-view";

export default class PreloadView extends ApplicationView {

  constructor() {
    super();
  }

  get template() {
    return `
    <section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <p class="text main-text">
        Пожалуста, дождитесь загрузки всех компонентов игры
      </p>
    </section>
    `;
  }
}
