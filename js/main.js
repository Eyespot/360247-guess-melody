import Application from "./basis/application";
import gameData from "./data/game-data";

const preloadMedia = () => {
  const tracks = new Set();
  const pictures = new Set();

  gameData.forEach((level) => {
    for (const option of gameData[gameData.indexOf(level)].options) {
      if (option.hasOwnProperty(`image`)) {
        pictures.add(option.image);
      } else if (option.hasOwnProperty(`source`)) {
        tracks.add(option.source);
      }
    }
  });
  console.log(tracks);
  console.log(pictures);
};

document.addEventListener(`DOMContentLoaded`, () => {
  Application.showWelcome();
});
