'use strict';

(function () {
  const RIGHT_ARROW = 39;
  const LEFT_ARROW = 37;
  const INITIAL_SCREEN = 0;
  const ARROWS_BUTTONS_TEMPLATE = `
<div class="arrows__wrap">
<style>
.arrows__wrap {
  position: absolute;
  top: 135px;
  left: 50%;
  margin-left: -56px;
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`.trim();

  const applicationContainer = document.querySelector(`.app`);
  const screens = Array.from(document.querySelector(`#templates`).content.querySelectorAll(`section.main`));

  let currentScreen = document.querySelector(`section.main`);

  const changeScreen = (screenNumber) => {
    const newScreen = screens[screenNumber].cloneNode(true);
    currentScreen.parentNode.replaceChild(newScreen, currentScreen);
    currentScreen = newScreen;
  };

  changeScreen(INITIAL_SCREEN);

  let currentScreenIndex = 0;

  const selectScreen = (index) => {
    index = index < 0 ? screens.length - 1 : index;
    index = index >= screens.length ? 0 : index;
    currentScreenIndex = index;
    changeScreen(currentScreenIndex);
  };

  const screenSteps = {
    stepBackward() {
      selectScreen(--currentScreenIndex);
    },
    stepForward() {
      selectScreen(++currentScreenIndex);
    }
  };

  const onArrowKeydown = (evt) => {
    switch (evt.keyCode) {
      case RIGHT_ARROW:
        screenSteps.stepForward();
        break;
      case LEFT_ARROW:
        screenSteps.stepBackward();
        break;
    }
  };

  document.addEventListener(`keydown`, onArrowKeydown);

  applicationContainer.insertAdjacentHTML(`beforeEnd`, ARROWS_BUTTONS_TEMPLATE);

  const arrowsButtons = Array.from(document.querySelectorAll(`.arrows__btn`));

  const onArrowButtonClick = (evt) => {
    const target = evt.target;
    if (target === arrowsButtons[0]) {
      screenSteps.stepBackward();

      return;
    }

    screenSteps.stepForward();
  };

  for (const button of arrowsButtons) {
    button.addEventListener(`click`, onArrowButtonClick);
  }
})();
