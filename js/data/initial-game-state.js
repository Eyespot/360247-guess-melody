import gameSettings from "./game-settings";

export default Object.freeze({
  lives: gameSettings.ATTEMPTS,
  time: gameSettings.START_TIME,
  screen: gameSettings.START_SCREEN
});
