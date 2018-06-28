// delete after audio implementation

const changeScreen = (data, state) => {
  const level = state.screen;

  if (!state.lives) {
  } else if (!state.timer) {
  } else if (state.screen === levelsQuantity) {

    showScreen(screenWinResult.element);
  } else if (data[level].gameType === `artist`) {

    screenArtistLevel.onPlayerButtonClick = (event) => {
      onPlayerButtonClick(event);
    };
    playFirstTrack(screenArtistLevel.firstTrack, screenArtistLevel.firstPlayButton, data[level]);
  } else if (data[level].gameType === `genre`) {

    screenGenreLevel.onPlayerButtonClick = (event) => {
      onPlayerButtonClick(event);
    };
    playFirstTrack(screenGenreLevel.firstTrack, screenGenreLevel.firstPlayButton, data[level]);
  }
};
