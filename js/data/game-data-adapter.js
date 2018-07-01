const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const convertAnswers = (level, answers) => answers.map((answer) => {

  if (level.type === GameType.ARTIST) {
    const artist = answer.title;
    const image = answer.image.url;
    const isCorrect = answer.isCorrect;

    return {artist, image, isCorrect};
  } else {
    const source = answer.src;
    const genre = answer.genre;

    return {source, genre};
  }
});

export const adaptServerData = (data) => {
  const gameData = [];
  data.forEach((level, index) => {
    gameData.push({});
    gameData[index].gameType = level.type;
    gameData[index].question = level.question;
    gameData[index].options = convertAnswers(level, level.answers);

    if (level.type === GameType.ARTIST) {
      gameData[index].source = level.src;
    } else {
      gameData[index].correctAnswer = level.genre;
    }
  });
  return gameData;
};
