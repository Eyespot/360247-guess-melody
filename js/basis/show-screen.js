let currentScreen = document.querySelector(`section.main`);

export default (newScreen) => {
  currentScreen.parentNode.replaceChild(newScreen, currentScreen);
  currentScreen = newScreen;
};
