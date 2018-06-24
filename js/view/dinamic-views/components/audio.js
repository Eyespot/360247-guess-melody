const GAME_TYPE_GENRE = `genre`;
const PLAYING_BUTTON_SELECTOR = `player-control--pause`;

let playingTrack = null;
let playingButton = null;

export const playFirstTrack = (firstTrack, firstPlayButton, level) => {
  firstTrack.play();
  playingTrack = firstTrack;
  playingButton = firstPlayButton;

  if (level.gameType === GAME_TYPE_GENRE) {
    firstPlayButton.classList.add(PLAYING_BUTTON_SELECTOR);
  }
};

export const onPlayerButtonClick = (event) => {
  event.preventDefault();
  const target = event.target;
  const track = target.previousElementSibling;

  if (target.classList.contains(PLAYING_BUTTON_SELECTOR)) {
    target.classList.remove(PLAYING_BUTTON_SELECTOR);
    track.pause();
    playingTrack = null;
    playingButton = null;
  } else {
    if (playingTrack) {
      playingButton.classList.remove(PLAYING_BUTTON_SELECTOR);
      playingTrack.pause();
    }
    target.classList.add(PLAYING_BUTTON_SELECTOR);
    track.play();
    playingTrack = track;
    playingButton = target;
  }
};
