const PLAYER_SELECTOR = `.player`;
const AUDIO_SELECTOR = `audio`;
const BUTTON_SELECTOR = `button`;
const GAME_TYPE_GENRE = `genre`;
const PLAYING_BUTTON_SELECTOR = `player-control--pause`;

export default (level, data, state) => {
  const players = level.querySelectorAll(PLAYER_SELECTOR);
  let playingTrack = players[0].children[0];
  playingTrack.play();
  let playingButton = players[0].children[1];

  if (data[state.screen].gameType === GAME_TYPE_GENRE) {
    playingButton.classList.add(PLAYING_BUTTON_SELECTOR);
  }

  players.forEach((item) => {
    const track = item.querySelector(AUDIO_SELECTOR);
    const button = item.querySelector(BUTTON_SELECTOR);
    button.onclick = (event) => {
      const target = event.target;
      event.preventDefault();
      if (target.classList.contains(PLAYING_BUTTON_SELECTOR)) {
        target.classList.remove(PLAYING_BUTTON_SELECTOR);
        track.pause();
        playingTrack = null;
        playingButton = null;
      } else {
        target.classList.add(PLAYING_BUTTON_SELECTOR);
        if (playingTrack) {
          playingTrack.pause();
          playingButton.classList.remove(PLAYING_BUTTON_SELECTOR);
        }
        track.play();
        playingTrack = track;
        playingButton = target;
      }
    };
  });
};
